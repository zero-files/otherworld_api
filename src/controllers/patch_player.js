const APIRouter = require("../routes/APIRouter")
//const APIError = require("../routes/APIError")
const BodyRequest = require("../utils/BodyRequest")
const {update, check} = require("../database/database")

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

patch_player.setContoller(async (req, res, next) => {
    try {
        let {id} = req.params || {}
        if(!id) return res.status(400).json({error: "id is undefined", message: `You must provide a player id, ${delete_player.path}`})

        let playerExist = await check.player_exist(id)
        if(playerExist === false) return res.status(404).json({error: "Player not found", message: `Player "${id}" not exists.`})

        let body = new BodyRequest("position", "alive", "inventory")
        body.assign(req.body)
        body.clear_nulls()

        if(body.is_empty()) return res.status(400).json({error: "Invalid body parameters", message: "You must provide some body parameters"})

        

    } catch(e){ next(e) }
})

module.exports = patch_player
