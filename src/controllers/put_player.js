const APIRouter = require("../routes/APIRouter")
//const APIError = require("../routes/APIError")
const {put, check} = require("../database/database")

const put_player = new APIRouter({
    method: "PUT",
    path: "/game/player/:id",
    tierAuth: 3,
    description: "Crea un nuevo jugador a partir de un ID, retorna el jugador en cuestión.",
    filename: __filename.split("/").pop()
})

put_player.setContoller(async (req, res, next) => {
    try {
        let {id} = req.params || {}
        if(!id) return res.status(400).json({error: "id is undefined", message: `You must provide a player id, ${put_player.path}`})
    
        let = await check.player_exist(id)
        if(playerExist === true) return res.status(409).json({error: "Player already exists", message: `The player with the id "${id}" already exists.`})
    
        let player = await put.player(id)
    
        return res.status(201).json({message: `Player ${id} has been created`, data: { player }})
        
    } catch(e){ next(e) }
})

module.exports = put_player
