const app = require("express")()
const helmet = require("helmet")
const bodyParser = require("body-parser")
const cors = require("cors")

const {reqreslog} = require("../controllers/middlewares")

app.set("port", process.env.PORT || 3000)

app.use(helmet())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.use(reqreslog)

module.exports = app
