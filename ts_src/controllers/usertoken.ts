import Route from "./_Route"
import {jwtVerify, jwtSign} from "../utils/crypt"

const index = new Route("post", "/user_token", undefined)
index.setController((req, res) => {
    let {name} =  req.body
    if(!name) return res.status(403).json({error: "body.name is undefined", message: "You must provide a name for your application"})
    if(typeof name != "string") name = String(name)
    
    let payload = {
        app_name: name,
        permissions: "user"
    }
    let token = jwtSign(payload)
    if(!token) return res.status(500).json({error: "Unexpected error", message: "An unexpected error occurred while generating the token, try again"})
    return res.status(200).json({message: `Token created successfully for the ${name} application.`, data: {
        token: token
    }})
})
index.addModelResponse({
    error: "An error",
    message: "A message",
    data: {
        token: "A jwt"
    }
})

export default index