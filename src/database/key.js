if(process.env.NODE_ENV === "development") PK = process.env.PK
else PK = JSON.parse(process.env.PK).replace(/\\n/g, '\n')

const key = {
    "type": "service_account",
    "project_id": process.env.PID,
    "private_key_id": process.env.PKID,
    "private_key": PK,
    "client_email": `firebase-adminsdk-sdfyv@${process.env.PID}.iam.gserviceaccount.com`,
    "client_id": process.env.CID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": `https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sdfyv%40${process.env.PID}.iam.gserviceaccount.com`
}

module.exports = key
