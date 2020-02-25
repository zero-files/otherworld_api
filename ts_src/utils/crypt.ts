import bcrypt from "bcryptjs"
type encrypt = string
type payload = {
    app_name?:string
    permissions?:string
}
type token = string
import jwt, { Secret } from "jsonwebtoken"
const JWTKEY:Secret = process.env.JWTKEY as Secret

export const encryptPassword = (password:string):Promise<encrypt> => {
    return new Promise((res, rej)=>{
        bcrypt.genSalt(5, (err, salt:string) =>{
            if(err) rej(`Ha ocurrido un error al encriptar: ${err}`)
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) rej(`2 Ha ocurrido un error al encriptar: ${err}`)
                res(hash)
            })
        })
    })
}

export const comparePassword = (inputPassword:string, storedPassword:encrypt):Promise<boolean> => {
    return new Promise((res, rej) => {
        bcrypt.compare(inputPassword, storedPassword, (err, r)=>{
            if(err) rej("Ha ocurrido un error al comparar")
            else res(r)
        })
    })
} 

export const jwtSign = (payload:payload):token =>{
    let token:token = jwt.sign(payload, JWTKEY)
    return token
}

export const jwtVerify = (token:token|undefined):"expired"|"error"|any => {
    if(!token) return "error"
    else {
        token = token.replace('Bearer ', '')
        return jwt.verify(token, JWTKEY, (err, decoded) => {
            if(err) {
                if(err.name == "TokenExpiredError") return "expired"
                else return "error"
            } else return decoded
        })
    }
}