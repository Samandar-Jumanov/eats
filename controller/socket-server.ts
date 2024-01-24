import { Socket, Server } from 'socket.io';
import Room from '../controller/room';
import RoomType from '../interface';

export const socketServer = (io: Server) => {
  const room = new Room();

  io.on('connection', (socket: Socket) => {
    // Join room process

    socket.on('join-room', (data : any) => {
           room.joinToRoom(data.roomName , data.userName )
    });

    // Leave room

    socket.on('leave-room', (data: RoomType) => {
      room.deleteRoom(data.roomName);
    });

    socket.on('room', (roomName: string) => {
      const foundRoom = room.search(roomName);
      socket.emit('room-info', foundRoom);
    });

    socket.on('disconnect', () => {
      room.removeUserOnDisconnect(socket.id);
    });
  });
};

