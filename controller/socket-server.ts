import { Socket , Server } from 'socket.io'
import Room from '../controller/room'
import RoomType from '../interface';
export const sockerServer = (io: Server) => {
    const room = new Room();
    const userSocketMap: Map<string, string> = new Map();
  
    io.on('connection', (socket: Socket) => {
      console.log(`${socket.id} connected`);
        userSocketMap.set('userId', socket.id);
  
      socket.on('create-room', (data) => {
        room.createRoom(data.roomName, data.adminName, socket.id);
      });
  
      socket.emit('rooms-available', room.rooms);
  
      socket.on('join-room', (data) => {
        const message = `${data.userName} wants to join your room yes/no`;
        socket.emit('get-offer', message);
      });
  
      
      socket.on('ask', ( roomName : string ) => {
        const message = `${socket.id} wants to join `;
        socket.emit('get-offer', message);
      });
  
      socket.on("answer" , ( data : boolean ) =>{
           socket.emit("response" , data );
      })
      
      socket.emit('leave-room', (data: RoomType) => {
        room.deleteRoom(data.roomName);
      });
  
      socket.on('room', (roomName: string) => {
        const foundRoom = room.search(roomName);
        socket.emit('room-info', foundRoom);
      });
  
      socket.on('leave-room', (roomName: string, userName: string) => {
        room.leaveRoom(roomName, userName);
      });
  
      socket.on('disconnect', () => {
        console.log(`${socket.id} is disconnected`);
        // Call the removeUserOnDisconnect method to handle user disconnection
        room.removeUserOnDisconnect(socket.id);
      });
    });
  };