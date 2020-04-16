const request = require("axios").default
const moment = require("moment")

/**
 * @typedef {{
 *      error: string
 *      message: string
 *  } | "unexpected" | "database" } errorRes
*/

class APIError extends Error {
    /**
    * 
    * @param {number} status_code HTTP status code
    * @param {errorRes} response Respuesta al cliente
    * @param {string} message_error Mensaje detallado del error
    * 
    */
    constructor(status_code, response, message_error){
        super(message_error)
        if(response === "unexpected") response = {error: "Unexpected Error", message: "Something strange has happened in this request. Please try again later or contact the developer."}
        else if(response === "database") response = {error: "Database error", message: "An error has occurred in the database, please try again."}

        this.status_code = status_code || 500
        this.response = response || {
            error: "Undefined Error",
            message: "This error has not been defined. This is very strange, please notify us at: URL"
        }

        this.name = `APIError: ${this.response.error}`
        this.date = moment().format("hh:mma DD-MM-YYYY")
    }

    /**
     * Notifica a Discord por medio de un webhook el error que ha ocurrido
     * @param {string} info Añade más información a la notificación
     * @returns {void} void
     */
    notify(info){
        let content = `<@&699051468170461225> *${this.date}*\n> ${this.name}\n ${info || "No hay más información al respecto"}`
        request.post(`https://discordapp.com/api/webhooks/${process.env.NOTIFY_WEBHOOK}`, {
            username: "Winston",
            avatar_url: "https://cdn.discordapp.com/avatars/406526611203162124/f03f5fcb5e2a11055ee76f29a6b3583a.png?size=512",
            content: content
        })
    }

    /**
     * Imprime en consola el error ocurrido
     * @returns {void} void
     */
    log(){
        console.log("-")
        console.log(this.date)
        console.error(this.stack)
        console.log("-")
    }
}
   
module.exports = APIError
