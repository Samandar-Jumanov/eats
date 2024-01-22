import RoomType from "../interface"

class Room {
    public rooms !: RoomType
    constructor( id : string  , name : string , roomName : string    ) {
        this.rooms = {
            users : [],
            adminId : id,
            roomName : roomName ,
            admin : name,
        }
    }

}

export default Room 