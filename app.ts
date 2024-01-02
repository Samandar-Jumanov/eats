import express , {Application , Request , Response , NextFunction } from 'express'
import * as http from 'http'
import helmet from 'helmet'
import {Socket , Server } from 'socket.io'
import * as path from 'path'
import  cors from 'cors'


const app : Application = express();
const server = http.createServer(app ,);
const io = new Server(server);




app.use(helmet());
app.use(express.static(path.join(__dirname , 'public')));

app.use((req : Request , res : Response , next : NextFunction) => {
    res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline' https://cdn.socket.io;"); 
    return next();
  });

// Socket 

io.on("connection", async ( socket : Socket) =>{
   getSocketId :   console.log(`${socket.id} connected `);

});


server.listen(3001 , ()=> console.log("Server is working on 3001 ") )
