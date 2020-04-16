const APIRouter = require("../routes/APIRouter")
const APIError = require("../routes/APIError")
//const {get, put, del, update, check} = require("../database/database")

const patch_player = new APIRouter({
    method: "PATCH",
    path: "/game/player/:id",
    tierAuth: 3,
    description: "Actualiza la información del player con la información proporcionada",
    parameters: [
        {
            name: "position",
            description: "Actualiza la posición del jugador.",
            type: "coordinates",
            isRequired: false
        },
        {
            name: "alive",
            description: "Define si el jugador está vivo o no",
            type: "boolean",
            isRequired: false
        },
        {
            name: "inventory",
            description: "Actualiza el inventario del jugador",
            type: "number[]",
            isRequired: false
        }
    ],
    filename: __filename.split("/").pop()
})

patch_player.setContoller(async (req, res) => {
    return res.send("En progreso :sad:")
})

module.exports = patch_player
