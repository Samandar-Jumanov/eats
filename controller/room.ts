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


    leaveRoom(roomname : string  , userName : string  ){
          const room  : any  = this.rooms.find(room => room.roomName === roomname);

          if(room.usersCount >1 ){
             const index = room.users.indexOf(userName);

            if(index > -1 && userName !== room.adminName){
                room.users.splice(index, 1);
                room.usersCount--;
            }else {
                 this.deleteRoom(roomname)
            }
          };
         
    };

    deleteRoom(roomName : string ){
         const room =  this.rooms.find(room => room.roomName === roomName );
         delete room 

    };

}

export default Room 