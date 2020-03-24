const admin = require("firebase-admin")
const key = require("./key")

admin.initializeApp({
    credential: admin.credential.cert(key),
    databaseURL: `https://${process.env.PID}.firebaseio.com`
});

const db = admin.firestore()
const player = db.collection("players")

export const get = {
    player: id => player.doc(`${id}`).get().then(doc => doc.data())
}

export const put = {
    newplayer: id => player.doc(`${id}`).set({
        userId: id,
        alive: true,
        position: {
            x: 0,
            y: 0
        }
    }),

}
