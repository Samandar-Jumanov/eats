import { Server, Socket } from 'socket.io';
import DataHash from './hash-data';
import init from './recieve-emails';

const hashData = new DataHash();
export default (io: Server): void  => {
        io.on('connection', async (socket: Socket) => {
     
           try {
            setInterval( async ()=> {
              const result : string[] =  await init();
              const isFound  : boolean =  await  hashData.search(result[0]);
              if(!isFound){
                  hashData.saveData(result[0] , result[1])
              }
              
        } , 1000)  ;
            
          return  hashData.data 
           } catch (error : any ) {
                 console.log(`Error occured in socket  ${error.message}`)
           }


      });
};


