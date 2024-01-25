import { Socket, Server } from 'socket.io';
import Room from '../controller/room';
import RoomType from '../interface';

export const socketServer = (io: Server) => {
  const room = new Room();

  io.on('connection', (socket: Socket) => {
    // Join room process

    socket.to(socket.id).emit("id" , socket.id);
    socket.emit("user-connected" , socket.id)

    socket.on("create-room" , (data ) =>{
      const  isRoomCreated =  room.createRoom(data.roomName  , data.userName);
      console.log(isRoomCreated);
      socket.emit("answer" , true );
      console.log("Room created  by : " ,  socket.id)
 }) // create room


 socket.on('leave-room', (data) => { // Leave room 
  room.leaveRoom(data.roomName , data.userName );
  console.log(data , ' Left');
});

socket.emit("rooms-available" , room.rooms ); // rooms available 

socket.on('room', (roomName: string) => {
  const foundRoom = room.search(roomName);
 
  socket.emit('room-info', foundRoom);
  console.log("Room info sent to :  " , foundRoom?.admin);
  console.log(foundRoom);

}); // room info 

socket.on('join-room', (data : any) => {
           room.joinToRoom(data.roomName , data.userName )
           console.log(`${socket.id} joined room `);

}); 


   

  



  
 


    socket.on('disconnect', () => {
      room.removeUserOnDisconnect(socket.id);
    }); // socket disconnection 
  });
};

