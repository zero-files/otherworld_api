const {Router} = require("express")
const {readdirSync} = require("fs")
const path = require("path")
const APIRouter = require("./APIRouter")
const router = Router()

const apiroutes = readdirSync(path.resolve("./src/controllers"))
const {authentication} = require("../controllers/middlewares")

router.get("/", (req, res) => {
    res.send("<h1>Index route!</h1>")
})

const routing = () => new Promise(async res => {
    let autodoc = []

    for(let i = 0; i < apiroutes.length; i++){
        if(apiroutes[i] === "middlewares.js" || apiroutes[i].startsWith("_")) continue
        
        let module = require(path.resolve(`./src/controllers/${apiroutes[i]}`))
        let apiroute = module.default || module
        
        if(!(apiroute instanceof APIRouter)) continue
        if(process.env.NODE_ENV == "development") await APIRouter.check(apiroute)
        
        autodoc.push(apiroute.getDoc())

        router[apiroute.method.toLowerCase()](apiroute.path, authentication(apiroute.tierAuth), apiroute.controller)
    }

    router.get("/autodocumentation", (req, res) => res.json({data: autodoc}))

    return res(router)
})

module.exports = routing
