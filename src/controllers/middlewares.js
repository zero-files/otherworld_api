const {jwtVerify, jwtSign} = require("../utils/crypt")
const JWTKEY = process.env.JWTKEY
const APIError = require("../routes/APIError")
/**@typedef {{app_name:string, tier:number}} APIPayload */

const reqreslog = (req, res, next) => {
    console.log(`${req.url} -${req.method}`)
    return next()
}

/**
 * @param {number} tier Nivel de autenticación
 */
const authentication = tier => (req, res, next) => {
    if(!tier || tier === 0) return next()
    if(!req.headers["authorization"]) return res.status(401).json({error: "Forbidden", message: "You must provide a token to get access to this route"})
    else {
        let jwt = req.headers["authorization"]
        /**@type {"error"|"expired"|APIPayload} */
        let requestData = jwtVerify(jwt)
        if(requestData === "error" || requestData === "expired") return res.status(401).json({error: "Forbidden", message: "The token provided is invalid or has expired"})

        if(requestData.tier === tier || requestData.tier > tier) return next()
        if(requestData.tier < tier) return res.status(401).json({error: "Forbidden", message: `You need a authentication tier ${tier} to make this request`})

        return res.status(500).json({error: "Unexpected Error", message: "Something strange has happened in the authentication process. Please try again later or contact the developer."})
    }
}

/**
 * @param {APIError} err
 */
const error = (err, req, res, next) => {
    if(!(err instanceof APIError)) {
        console.log("!-")
        console.log(err.stack)
        console.log("!-")
        err = new APIError()
    }
    err.notify(`${req.url} -${req.method}`)
    err.log()
    return res.status(err.status_code).json(err.response)
}

module.exports = {
    reqreslog,
    authentication,
    error
}
