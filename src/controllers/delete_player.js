const APIRouter = require("../routes/APIRouter")
const errors = require("../utils/errors")
const {del, check} = require("../database/database")

const delete_player = new APIRouter({
    method: "DELETE",
    path: "/game/player/:id",
    tierAuth: 3,
    description: "Elimina un player según su id",
    filename: __filename.split("/").pop()
})

delete_player.setContoller(async (req, res) => {
    let {id} = req.params || {}
    if(!id) return res.status(400).json({error: "id is undefined", message: `You must provide a player id, ${delete_player.path}`})

    let playerExist = null
    try {
        playerExist = await check.player_exist(id)
        
    } catch (e) { return res.status(500).json(errors.db(e)) }
    if(playerExist === null) return res.status(500).json(errors.unexpected)

    if(playerExist === false) return res.status(404).json({error: "Player not found", message: `Player "${id}" not exists.`})

    try {
        await del.player(id)

    } catch (e) { return res.status(500).json(errors.db(e)) }

    return res.status(200).json({message: `Player ${id} has been deleted.`})
})

module.exports = delete_player
