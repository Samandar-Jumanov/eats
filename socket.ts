import { Server, Socket } from 'socket.io';

export default (io: Server): void  => {
        io.on('connection', async (socket: Socket) => {
     
           try {
                console.log(`${socket.id} connected `);
                

           } catch (error : any ) {
                 console.log(`Error occured in socket  ${error.message}`)
           }


      });
};


