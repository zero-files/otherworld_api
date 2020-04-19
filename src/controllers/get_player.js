const APIRouter = require("../routes/APIRouter")
//const APIError = require("../routes/APIError")
const {get, check} = require("../database/database")

const get_player = new APIRouter({
    method: "GET",
    path: "/game/player/:id",
    tierAuth: 3,
    description: "Obtiene un jugador a partir de un ID",
    filename: __filename.split("/").pop()
})

get_player.setContoller(async (req, res, next) => {
    try {
        let {id} = req.params || {}
        if(!id) return res.status(400).json({error: "id is undefined", message: `You must provide a player id, ${get_player.path}`})
        
        let player = await get.player(id)
        if(!player) return res.status(404).json({error: "Player not found", message: `Player "${id}" not exists.`})

        return res.status(200).json({message: "Player was found", data: { player }})

    } catch (e) { next(e) }
})

module.exports = get_player
