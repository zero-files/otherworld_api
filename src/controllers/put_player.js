const APIRouter = require("../routes/APIRouter")
const errors = require("../utils/errors")
const {put, check} = require("../database/database")

const put_player = new APIRouter({
    method: "PUT",
    path: "/game/player/:id",
    tierAuth: 3,
    description: "Coloca un nuevo jugador en la base de datos a partir de un ID",
    fileName: __filename.split("/").pop()
})

put_player.setContoller(async (req, res) => {
    let {id} = req.params || {}
    if(!id) return res.status(400).json({error: "id is undefined", message: `You must provide a player id, ${put_player.path}`})

    let playerExist = null
    try {
        playerExist = await check.player_exist(id)
        
    } catch (e) { return res.status(500).json(errors.db(e)) }
    if(playerExist === null) return res.status(500).json(errors.unexpected)

    if(playerExist === true) return res.status(409).json({error: "Player already exists", message: `The player with the id "${id}" already exists.`})

    let player = null
    try {
        player = await put.player(id)

    } catch (e) { return res.status(500).json(errors.db(e)) }
    if(player === null) return res.status(500).json(errors.unexpected)

    return res.status(201).json({message: `Player ${id} has been created`, data: { player }})
})

module.exports = put_player
