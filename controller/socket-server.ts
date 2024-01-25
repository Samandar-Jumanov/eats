import { Socket, Server } from 'socket.io';
import RoomType from '../interface';
/*
* create room 
* leave room 
* delete room 
* join room 
* users in room 
*/

export const socketServer = (io: Server) => {

  io.on('connection', (socket: Socket) => {
      console.log('a user connected');

      socket.on('createRoom', (roomName : string ) => {
        socket.join(roomName);
      });

      socket.on('joinRoom', (roomName : string ) => {
        socket.join(roomName);
      });

      socket.on('leaveRoom', (roomName : string ) => {
        socket.leave(roomName);
      });

      socket.emit("available-rooms" , Object.keys(socket.rooms))
  });
}
