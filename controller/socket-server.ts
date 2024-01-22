import { Socket , Server } from 'socket.io'
import RoomType from '../interface';
import Room from '../controller/room'

export const sockerServer = (io : Server ) =>{
    let newRoom;

    io.on('connection' , (socket : Socket ) =>{
        console.log(socket.id);


        socket.on("create-room" , ( data : RoomType )=>{
             newRoom = new Room(socket.id , data.admin , data.roomName )
        }) 

        socket.on('disconnect' , () =>{
              console.log(`${socket.id} is disconnected `);
        })
 });
 
}