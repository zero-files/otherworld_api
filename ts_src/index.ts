if(process.env.NODE_ENV == "development") require("dotenv").config()
import app from "./server/app"

function main():Promise<boolean> {
    return new Promise(async res => {
        app.listen(app.get("port"), () => console.log(`Corriendo en puerto ${app.get("port")}.`));
        res()
    })
}

main()