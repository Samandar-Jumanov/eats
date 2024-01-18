import { Socket , Server } from 'socket.io'
import CallUserData from '../interface'



export const sockerServer = (io : Server ) =>{
    io.on('connection' , (socket : Socket ) =>{
        console.log(socket.id);
        socket.emit('me' , socket.id);
 
 
        socket.on('disconnect' , () =>{
            socket.broadcast.emit("call-ended")
        });
 
        socket.on('call-user' , (data : CallUserData ) =>{
                io.to(data.userToCall).emit("call-user" , {
                     signal : data.signalData,
                     from : data.name 
                })
        });
 
        socket.on("answer-call" , (data : any ) =>{
              io.to(data.to).emit('call-accepted' , data.signal)
        })
 });
 
}