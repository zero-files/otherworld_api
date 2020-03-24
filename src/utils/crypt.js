const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWTKEY = process.env.JWTKEY

/**
 * Encripta contraseñas usando bcrypt
 * @param {string} password Contraseña a encriptar
 * @returns {Promise<string>}
 */
const encryptPassword = password => {
    return new Promise((res, rej)=>{
        bcrypt.genSalt(5, (err, salt) =>{
            if(err) rej(`Ha ocurrido un error al encriptar: ${err}`)
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) rej(`2 Ha ocurrido un error al encriptar: ${err}`)
                res(hash)
            })
        })
    })
}

/**
 * Compara la contraseña introducida con la encriptada persistida
 * @param {string} inputPassword Contraseña sin encriptar ingresada por el usuario
 * @param {string} storedPassword Contraseña encriptada persistida
 * @returns {Promise<boolean>}
 */
const comparePassword = (inputPassword, storedPassword) => {
    return new Promise((res, rej) => {
        bcrypt.compare(inputPassword, storedPassword, (err, r)=>{
            if(err) rej("Ha ocurrido un error al comparar")
            else res(r)
        })
    })
} 

/**
 * Firma una carga y genera un jwt
 * @param {any} payload Carga a firmar
 * @returns {string} JSON Web Token
 */
const jwtSign = payload => {
    let token = jwt.sign(payload, JWTKEY)
    return token
}

/**
 * Verifica el jwt ingresado
 * @param {string} token JSON Web Token a verificar
 * @returns {"error"|"expired"|any}
 */
const jwtVerify = token => {
    if(!token) return "error"
    else {
        token = token.replace("Bearer ", "")
        return jwt.verify(token, JWTKEY, (err, decoded) => {
            if(err) {
                if(err.name == "TokenExpiredError") return "expired"
                else return "error"
            } else return decoded
        })
    }
}

module.exports = {
    encryptPassword,
    comparePassword,
    jwtSign,
    jwtVerify
}
