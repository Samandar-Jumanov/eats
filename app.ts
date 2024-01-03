import express , {Application , Request , Response , NextFunction } from 'express'
import * as http from 'http'
import helmet from 'helmet'
import {Socket , Server } from 'socket.io'
import * as path from 'path'
import  cors from 'cors'
import OrderType from './interface'


const app : Application = express();
const server = http.createServer(app ,);
const io = new Server(server);
app.use(cors({
    origin : '*',
    methods :['GET','POST', 'PUT', 'DELETE']
}))



app.use(helmet());
app.use(express.static(path.join(__dirname , 'public')));

app.use((req : Request , res : Response , next : NextFunction) => {
    res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline' https://cdn.socket.io;"); 
    return next();
  });

// Socket 

io.on("connection", async ( socket : Socket) =>{
    sendUserId : socket.emit('getId', socket.id)
    
    getOrder : socket.on('send-order', (order : OrderType)=>{
               console.log(order)
               if(order.location === null ){
            locationIsInvlid :    socket.emit("invalid-order", "Location is invalid ")
               } else {
                sendResponse : socket.emit("response-order", "Order is being prepared");
               }

      });
});


server.listen(3001 , ()=> console.log("Server is working on 3001 ") )
