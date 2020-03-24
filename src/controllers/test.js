const APIRouter = require("../routes/APIRouter")

const test = new APIRouter({
    method: "GET",
    path: "/test",
    tierAuth: 0,
    description: "Ruta de pruebas",
    fileName: __filename
})

test.setContoller((req, res) => {
    res.json("esoo!")
})

module.exports = test
