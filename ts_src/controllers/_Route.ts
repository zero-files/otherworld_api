import {Request, Response as ExResponse, NextFunction} from "express"
import apiResponse from "../models/apiResponse"
import {authentication} from "./middlewares"

interface Response extends Omit<ExResponse, "json">{
    json:(body:apiResponse) => void
}
type middleware = (req:Request, res:ExResponse, next:NextFunction)=>void

export default class Route {
    public method:"get"|"post"
    public path:string
    public authenticated:middleware
    public controller:(req:Request, res:Response)=>void
    public middlewares:middleware[] = []

    constructor(method:"get"|"post", path:string, authenticated:boolean, controller?:(req:Request, res:Response)=>void){
        this.method = method
        let defPath:string = path.startsWith("/") ? path : `/${path}`
        this.path = defPath
        this.authenticated = authenticated ? authentication : function(req:Request, res:ExResponse, next:NextFunction) { return next() }
        this.controller = controller || function (req:Request, res:Response){return res.send("Undefined route.")}
        this.middlewares.push(this.authenticated)
    }

    public setController(ctrl:(req:Request, res:Response)=>void):void {
        this.controller = ctrl
    }

    public addMiddleware(fn:middleware){
        this.middlewares.push(fn)
    }

    public addModelResponse(model:any){
        let modelmid:middleware = (req, res, next) => {
            if(req.query && req.query.model === "true") return res.status(200).json({message: "You have requested a model", model})
            else return next()
        }
        this.middlewares.push(modelmid)
    }
    
}