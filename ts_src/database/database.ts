import admin from "firebase-admin"
import privatedb from "./privatedb"

admin.initializeApp({
    //@ts-ignore
    credential: admin.credential.cert(privatedb.credential),
    databaseURL: privatedb.databaseURL
});

const db = admin.firestore()
const player = db.collection("players")

export const get = {
    player: (id:string) => player.doc(`${id}`).get().then(doc => doc.data())
}

export const put = {
    newplayer: (id:string) => player.doc(`${id}`).set({
        userId: id,
        alive: true,
        position: {
            x: 0,
            y: 0
        }
    }),

}
