import RoomType from "../interface"

class Room {
    public rooms !: RoomType[]
    constructor() {}

     createRoom(roomName : string  , roomAdmin : string  , id : string  ){
         const newRoom : RoomType = { 
             adminId : id ,
             admin: roomAdmin ,
             users : [] ,
             roomName : roomName,
             usersCount : 0 
            };

            this.rooms.push(newRoom);
    };


    joinToRoom(roomName : string ,  newUser : string ){
        const room = this.rooms.find(room => room.roomName === roomName);
        if(room){
            room.users.push(newUser);
            room.usersCount++;
    }

    }

}

export default Room 