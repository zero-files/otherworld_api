const db = e => { 
    console.error(e)
    return {error: "Database error", message: "An error has occurred in the database, please try again."} 
}
const unexpected = {error: "Unexpected Error", message: "Something strange has happened in this request. Please try again later or contact the developer."}

module.exports = {
    db,
    unexpected
}