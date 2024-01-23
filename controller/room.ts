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
            usersCount: 0,
        };

        this.rooms.push(newRoom);
        return true 
    }

    joinToRoom(roomName: string, newUser: string) {
        const room = this.rooms.find((room) => room.roomName === roomName);

        if (room) {
            room.users.push(newUser);
            room.usersCount++;
        } else {
            throw new Error('Room not found');
        }
    }

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
                throw new Error('User is the admin or not found in the room');
            }
        } else {
            throw new Error('Room not found');
        }
    };

    deleteRoom(roomName: string) {
        const roomIndex = this.rooms.findIndex((room) => room.roomName === roomName);

        if (roomIndex !== -1) {
            this.rooms.splice(roomIndex, 1);
        } else {
            throw new Error('Room not found');
        }
    }
}

export default Room;
