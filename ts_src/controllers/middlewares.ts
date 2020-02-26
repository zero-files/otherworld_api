import {Request, Response, NextFunction} from "express"
import {jwtVerify, jwtSign} from "../utils/crypt"
import { Secret } from "jsonwebtoken"
const JWTKEY:Secret = process.env.JWTKEY as Secret

export const reqreslog = (req:Request, res:Response, next:NextFunction) => {
    console.log(`${req.url} -${req.method}`)
    return next()
}

export const authentication = (levelAuth:"user"|"readwrite"|"read") => {
    return (req:Request, res:Response, next:NextFunction) => {
        if(!req.headers["authorization"]) return res.status(400).json({error: "Forbidden", message: "You must provide a token to get access to this route"})
        else {
            let jwt = req.headers["authorization"]
            let requestData = jwtVerify(jwt)
            if(requestData === "error" || requestData === "expired") return res.status(403).json({error: "Forbidden", message: "The token provided is invalid or has expired"})
            
            if(requestData.permissions === "readwrite") return next()
            if(requestData.permissions === levelAuth) return next()
            if(requestData.permissions === "read" && (levelAuth === "user" || levelAuth === "read")) return next()
            if(requestData.permissions === "user" && levelAuth !== "readwrite") return next()
            if(requestData.permissions === "user" && levelAuth !== "read") return next()

            else {
                if(levelAuth === "read") return res.status(403).json({error: "Forbidden", message: "You need 'read' permissions to make this request"})
                if(levelAuth === "readwrite") return res.status(403).json({error: "Forbidden", message: "You need 'read and write' permissions to make this request"})
                if(levelAuth === "user") return res.status(403).json({error: "Forbidden", message: "You need 'user read' to make this request"})
                return res.status(403).json({error: "Forbidden", message: "You need special permissions to make this request"})
            }
        }
    }
}