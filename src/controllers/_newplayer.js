const APIRouter = require("../routes/APIRouter")
const errors = require("../utils/errors")
const {get, put, del, update, check} = require("../database/database")

const newplayer = new APIRouter({
    method: "POST",
    path: "/game/new_player",
    tierAuth: 3,
    description: "Crea un nuevo jugador a partir de un ID, retorna el jugador en cuestión.",
    filename: __filename.split("/").pop(),
    parameters: [
        {
            name: "playerid",
            type: "id",
            description: "ID de Discord del usuario.",
            isRequired: true
        }
    ]
})

newplayer.setContoller(async (req, res) => {
    let {playerid} = req.body
    if(!playerid) return res.status(400).json({error: "body.playerid is undefined", message: "You must provide a player id"})
    
    let playerExist = null
    try {
        playerExist = await check.player_exist(playerid)
        
    } catch (e) { return res.status(500).json(errors.db(e)) }
    if(playerExist === null) return res.status(500).json(errors.unexpected)

    if(playerExist === true) return res.status(409).json({error: "Player already exists", message: `The player with the id "${playerid}" already exists.`})

    let player = null
    try {
        player = await put.new_player(playerid)

    } catch (e) { return res.status(500).json(errors.db(e)) }
    if(player === null) return res.status(500).json(errors.unexpected)

    return res.status(201).json({message: `Player ${playerid} has been created`, data: { player }})
})

module.exports = newplayer
