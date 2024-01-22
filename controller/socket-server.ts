import { Socket , Server } from 'socket.io'


export const sockerServer = (io : Server ) =>{
    io.on('connection' , (socket : Socket ) =>{
        console.log(socket.id);

      
        

        socket.on('join room' , ( roomId ) =>{
           socket.join(roomId);
           console.log(`${socket.id} joined room ${roomId}`)
        });
 
        socket.on('offer' , (offer , roomId ) =>{
           socket.to(roomId).emit("offer" , offer);
           console.log(`${socket.id} sent offer to room ${roomId}`)
        });
 
        socket.on("answer" , (answer , roomId) =>{
          socket.to(roomId).emit("answer", answer);
          console.log(` Sent an asnwer to ${roomId} `)
        });

        socket.on('ice-candidate' , (candidate , roomId) =>{
            socket.to(roomId).emit('ice candidate' , candidate);
            console.log(`${socket.id} sent ice candidate to room ${roomId}`)
        });


        socket.on('disconnect' , () =>{
              console.log(`${socket.id} is disconnected `);

        })
 });
 
}