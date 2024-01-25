// server.ts
import { Socket, Server } from 'socket.io';

export const socketServer = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    socket.on('createRoom', (roomName: string) => {
      socket.join(roomName);
      console.log('A new room created: ', roomName);
    });

    socket.on('joinRoom', (roomName: string) => {
      socket.join(roomName);
      console.log('User joined room: ', roomName);
    });

    socket.on('leaveRoom', (roomName: string) => {
      socket.leave(roomName);
      console.log('User left room: ', roomName);
    });

    socket.on('availableRoomsCheck', () => {
      emitAvailableRooms(socket);
    });
  });
};

function emitAvailableRooms(socket: Socket) {
  const rooms = getAvailableRooms(socket);
  socket.emit('available-rooms', rooms);
}

function getAvailableRooms(socket: Socket): string[] {
  // Convert the Set of rooms to an array
  return Array.from(socket.rooms.values());
}
