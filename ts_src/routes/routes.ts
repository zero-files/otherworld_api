import {Router} from "express"
import {readdirSync} from "fs"
import path from "path"
import Route from "../controllers/_Route"
const router:Router = Router()

const routes = readdirSync(path.resolve("./src/controllers"))

// for(let i = 0; i < routes.length; i++){
//     if(routes[i] === "middlewares.js" || routes[i].startsWith("_")) continue
//     let controller = require(path.resolve(`./src/controllers/${routes[i]}`))
//     let method = routes[i].slice(0, 3)
//     let route = routes[i].slice(4, -3)
//     if(!controller || !method || !route) continue
//     if(route === "index") route = "/"
//     //@ts-ignore
//     router[method](route, controller.default || controller)
// }

for(let i = 0; i < routes.length; i++){
    if(routes[i] === "middlewares.js" || routes[i].startsWith("_")) continue
    let module = require(path.resolve(`./src/controllers/${routes[i]}`))
    let route:Route|any = module.default || module
    if(!(route instanceof Route)) continue
    let method = route.method
    router[method](route.path, ...route.middlewares, route.controller)
}

export default router