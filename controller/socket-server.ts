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
        socket.rooms.add(roomName);
        console.log("a new room created  ");
        console.log(socket.rooms.values())
      });


      socket.on('joinRoom', (roomName : string ) => {
        socket.join(roomName);
      });

      socket.on('leaveRoom', (roomName : string ) => {
        socket.leave(roomName);
      });

      socket.emit("available-rooms" , Object.values(socket.rooms.values()))
  });
}
