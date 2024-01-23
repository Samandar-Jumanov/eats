import { Socket , Server } from 'socket.io'
import Room from '../controller/room'
import RoomType from '../interface';

export const sockerServer = (io : Server ) => {
    const room = new Room();

    io.on('connection' , (socket : Socket ) =>{
        console.log(socket.id);


        socket.on("create-room" , ( data  )=>{
               room.createRoom( data.roomName, data.adminName ,socket.id  )
        }); // room creation 

        socket.emit("rooms-available" , room.rooms); // shows roooms to user 

        socket.on("join-room" , ( data ) =>{
            const message = `${data.userName } wants to join your room yes/no`
            socket.emit('get-offer' , message );
        }); // join room 

        socket.on('offer' , ( answer : string ,  data  ) =>{
                if(answer === 'yes'){
                    room.joinToRoom( data.roomName, data.userName );
                }else {
                    socket.emit('fail' ,  `${data.roomName} refused`);
                }
        });
        
        socket.emit('leave-room', ( data  : RoomType ) =>{
            room.deleteRoom(data.roomName)
        });

        socket.on("room" , (roomName : string ) =>{
               const foundRoom = room.search(roomName);
              socket.emit("room-info" , foundRoom)
        })
        socket.on('leave-room' , ( roomName : string  , userName : string   ) =>{
            room.leaveRoom( roomName ,  userName  );
        });

        // Peer to peeer connection events 
        

        socket.on('disconnect' , () =>{
              console.log(`${socket.id} is disconnected `);
        });

 });
 
}