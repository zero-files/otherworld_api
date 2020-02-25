import coordinates from "./coordinates"
import id from "./id"

type square = {
    coordinates:coordinates
    zombies:number
    channelId:id
    players:id[]
}

export default square