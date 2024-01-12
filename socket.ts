import { Server, Socket } from 'socket.io';
import DataHash from './hash-data';
const hashData = new DataHash();

export default (io: Server, init: () => string[]): void => {
  io.on('connection', async (socket: Socket) => {
        setInterval( async ()=>{
             const result =  await init();
             const isFound =  await  hashData.search(result[0]);
             if(!isFound){
                 hashData.saveData(result[0] , result[1])
             }
             
       } , 1000)  ;

       
    try {
      const result  = await init();
      console.log("Initialization data:", result);
    } catch (error : any ) {
      console.error("Initialization failed:", error.message);
    }
  });
};
