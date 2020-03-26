const APIRouter = require("../routes/APIRouter")

const test = new APIRouter({
    method: "GET",
    path: "/test",
    tierAuth: 1,
    description: "Ruta de pruebas",
    parameters: [
        {
            name: "nombre",
            type: "string",
            description: "parametro de test",
            isRequired: false
        }
    ],
    filename: __filename.split("/").pop()
})

test.setContoller((req, res) => {
    res.json("esoo!")
})

module.exports = test
