const APIRouter = require("../routes/APIRouter")
//const APIError = require("../routes/APIError")
//const BodyRequest = require("../utils/BodyRequest")
const {get} = require("../database/database")

const get_players = new APIRouter({
    method: "GET",
    path: "/game/players",
    tierAuth: 3,
    description: "Obtiene una lista de todos los jugadores y toda su información.",
    filename: __filename.split("/").pop()
})

get_players.setContoller(async (req, res, next) => {
    try {
        let players = await get.players()
        res.status(200).json({message: "Lista de usuarios obtenida", data: { players: players }})    
    } catch(e){ next(e) }
})

module.exports = get_players
