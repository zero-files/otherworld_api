const APIRouter = require("../routes/APIRouter")
const errors = require("../utils/errors")
const {get, check} = require("../database/database")

const get_player = new APIRouter({
    method: "GET",
    path: "/game/player/:id",
    tierAuth: 3,
    description: "Obtiene un player según el ID",
    filename: __filename.split("/").pop()
})

get_player.setContoller(async (req, res) => {
    let {id} = req.params || {}
    if(!id) return res.status(400).json({error: "id is undefined", message: `You must provide a player id, ${get_player.path}`})
    
    let player = null
    try { 
        player = await get.player(id)

    } catch (e) { return res.status(500).json(errors.db(e)) } 
    if(player === null) return res.status(500).json(errors.unexpected)

    if(!player) return res.status(404).json({error: "Player not found", message: `Player "${id}" not exists.`})

    return res.status(200).json({message: "Player was found", data: { player }})
})

module.exports = get_player
