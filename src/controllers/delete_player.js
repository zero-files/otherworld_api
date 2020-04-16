const APIRouter = require("../routes/APIRouter")
const APIError = require("../routes/APIError")
const {del, check} = require("../database/database")

const delete_player = new APIRouter({
    method: "DELETE",
    path: "/game/player/:id",
    tierAuth: 3,
    description: "Elimina un jugador a partir de un ID",
    filename: __filename.split("/").pop()
})

delete_player.setContoller(async (req, res, next) => {
    try {
        let {id} = req.params || {}
        if(!id) return res.status(400).json({error: "id is undefined", message: `You must provide a player id, ${delete_player.path}`})

        let playerExist = await check.player_exist(id)
        if(playerExist === false) return res.status(404).json({error: "Player not found", message: `Player "${id}" not exists.`})

        await del.player(id)

        return res.status(200).json({message: `Player ${id} has been deleted.`})
    } catch(e){ next(e) }
})

module.exports = delete_player  
