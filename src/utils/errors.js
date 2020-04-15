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
    }

    notify(){

    }

    log(){
        
    }
}

module.exports = {
    APIError
}