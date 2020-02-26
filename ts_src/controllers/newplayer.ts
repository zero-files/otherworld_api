import Route from "./_Route"
import {put} from "../database/database"

const newplayer = new Route("post", "/game/new_player", "readwrite")

newplayer.setController(async (req, res) => {
    let {userid} = req.body
    
    if(!userid) return res.status(400).json({error: "body.userid is undefined", message: "You must provide a user id"})
    await put.newplayer(userid)
    
    res.status(201).json({message: `The user '${userid}' has been created successfully`})

})

export default newplayer