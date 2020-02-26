import Route from "./_Route"
import {get} from "../database/database"
 
const user = new Route("get", "/game/player", "read")

user.setController(async (req, res) => {
    let {userid} = req.body
    if(!userid) return res.status(400).json({error: "body.userid is undefined", message: "You must provide a user id"})
    
    let userData = await get.player(userid)
    if(!userData) return res.status(400).json({error: "player not found", message: `The player '${userid}' not exists`})
    
    return res.status(200).json({message: "User found", data: userData})
})

export default user