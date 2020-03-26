const APIRouter = require("../routes/APIRouter")
const errors = require("../utils/errors")
const {get, put, del, update, check} = require("../database/database")

const player = new APIRouter({
    method: "GET",
    path: "/game/player",
    tierAuth: 3,
    description: "Obtiene la información de un jugador.",
    fileName: __filename.split("/").pop()
})

player.setContoller(async (req, res) => {
    let {playerid} = req.body
    if(!playerid) return res.status(400).json({error: "body.playerid is undefined", message: "You must provide a player id"})

    let player = null
    try { 
        player = await get.player(playerid)

    } catch (e) { return res.status(500).json(errors.db(e)) } 
    if(player === null) return res.status(500).json(errors.unexpected)
    
    if(!player) return res.status(200).json({error: "Player not found", message: `Player "${playerid}" not exists.`, data: { player: {}}})

    return res.status(200).json({message: "Player was found", data: { player }})
})

module.exports = player
