import express, {Application} from "express"
import helmet from "helmet"
import bodyParser from "body-parser"
import path from "path"
//import cookieParser from "cookie-parser"

//vars
const app:Application = express()
const docsURL:string = "http://localhost:3000/"
import routes from "../routes/routes"
import { reqreslog } from "../controllers/middlewares"

//config
app.set("port", process.env.PORT || 3000)
//app.set("views", path.join(__dirname, "../public/views"))
//app.use(express.static(path.join(__dirname, "../public")))

//middlewares
app.use(helmet())
//app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(reqreslog)

//prestart
app.use(routes)
app.use((req, res) => res.status(404).json({error: 'URL not found', message: `The requested url '${req.url}' wat not found. Please, read the docs: ${docsURL}`}))


export default app