import admin from "firebase-admin"
import privatedb from "./privatedb"

admin.initializeApp({
    //@ts-ignore
    credential: admin.credential.cert(privatedb.credential),
    databaseURL: privatedb.databaseURL
});

const db = admin.firestore()

