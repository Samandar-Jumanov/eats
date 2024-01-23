import RoomType from "../interface";

class Room {
    public rooms: RoomType[] = [];

    constructor() {}

    createRoom(roomName: string, roomAdmin: string, adminId: string) {
        const existingRoom = this.rooms.find((room) => room.roomName === roomName);

        if (existingRoom) {
            return 'Room has already been created'
        }

        const newRoom: RoomType = {
            adminId,
            admin: roomAdmin,
            users: [],
            roomName,
            usersCount: 1,
        };
          newRoom.users.push(roomAdmin);
         this.rooms.push(newRoom);
        return true 
    }

    joinToRoom(roomName: string, newUser: string) {
        const room = this.rooms.find((room) => room.roomName === roomName);
         if(!room) return `Room with  such name : ${roomName} is undefined `;
         room.users.push(newUser);
         return "Succes";

    };

    leaveRoom(roomName: string, userName: string) {
        const roomIndex = this.rooms.findIndex((room) => room.roomName === roomName);

        if (roomIndex !== -1) {
            const room = this.rooms[roomIndex];

            const userIndex = room.users.indexOf(userName);

            if (userIndex > -1 && userName !== room.admin) {
                room.users.splice(userIndex, 1);
                room.usersCount--;

                if (room.usersCount === 0) {
                    this.rooms.splice(roomIndex, 1);
                }
            } else {
                 this.deleteRoom(roomName);
            }
        } else {
             return `There is no room called ${roomName}`
        };
    };

    deleteRoom(roomName: string) {
        const roomIndex = this.rooms.findIndex((room) => room.roomName === roomName);

        if (roomIndex !== -1) {
            this.rooms.splice(roomIndex, 1);
        } else {
             return `There is no room called ${roomName}`
        }
    }

    search(roomName: string) {
        return this.rooms.find((room) => room.roomName === roomName);
    }

    removeUserOnDisconnect(userId: string) {
        const roomIndex = this.rooms.findIndex((room) => room.users.includes(userId));
    
        if (roomIndex !== -1) {
          const room = this.rooms[roomIndex];
          const userIndex = room.users.indexOf(userId);
    
          if (userIndex > -1) {
            room.users.splice(userIndex, 1);
            room.usersCount--;
    
            if (room.usersCount === 0) {
              this.rooms.splice(roomIndex, 1);
            }
          }
        }
      }
      
}

export default Room;
