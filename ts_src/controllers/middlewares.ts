import {Request, Response, NextFunction} from "express"

export const reqreslog = (req:Request, res:Response, next:NextFunction) => {
    console.log(`${req.url} -${req.method}`)
    return next()
}

export const authentication = (req:Request, res:Response, next:NextFunction) => {
    return next()
}