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
     * @param {string} id ID del jugador
     * @returns {Promise<player>}
     */
    player: id => players.doc(`${id}`).get().then(doc => doc.data()).catch(e => {console.log("a", e); throw e })
}

const put = {
    /**
     * @param {string} id ID del jugador
     * @returns {Promise<player>}
     */
    new_player: async id => {
        /**@type {player} */
        let player = {
            playerid: id,
            alive: true,
            position: {
                x: 0,
                y: 0
            }
        }
        console.log("x")
        await players.doc(`${id}`).set(player)
            .catch(e => { console.log(e);throw e })
        
        return player
    }
}

const del = {

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
