const admin = require("firebase-admin")
const key = require("./key")

/**
 * @typedef {{
 *  x:number
 *  y:number
 * }} position
*/

/**
 * @typedef {{
 *  playerid:string
 *  alive:boolean
 *  position:position
 * }} player
 */

admin.initializeApp({
    credential: admin.credential.cert(key),
    databaseURL: `https://${process.env.PID}.firebaseio.com`
});

const db = admin.firestore()
const players = db.collection("players")

const get = {
    /**
     * Obtiene un jugador de la base de datos a partir de un id
     * @param {string} id ID del jugador
     * @returns {Promise<player>}
     */
    player: id => players.doc(`${id}`).get().then(doc => doc.data()).catch(e => { throw e })
}

const put = {
    /**
     * Coloca un nuevo jugador en la base de datos a partir de un id
     * @param {string} id ID del jugador
     * @returns {Promise<player>}
     */
    player: async id => {
        /**@type {player} */
        let player = {
            playerid: id,
            alive: true,
            position: {
                x: 0,
                y: 0
            }
        }

        await players.doc(`${id}`).set(player)
            .catch(e => { throw e })
        
        return player
    }
}

const del = {
    /**
     * Elimina un jugador de la base de datos a partir de un id
     * @param {string} id ID del jugador
     * @returns {Promise<player>}
     */
    player: id => players.doc(`${id}`).delete()
}

const check = {
    player_exist: id => players.where("playerid", "==", `${id}`).get().then(q => q.empty ? false : true)
}


module.exports = {
    get,
    put,
    del,
    check
}
