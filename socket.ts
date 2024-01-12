import { Server, Socket } from 'socket.io';

export default (io: Server) => {
   io.on('connection', async (socket: Socket) => {
          console.log("User connected to server " , socket.id )
          
   });
};
