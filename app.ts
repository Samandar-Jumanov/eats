import express , {Application , Request , Response } from 'express'
import * as http from 'http'
import helmet from 'helmet'
import {Socket , Server } from 'socket.io'
import * as path from 'path'
const app : Application = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(helmet());
app.use(express.static(path.join(__dirname , 'public')))

// Socket 

io.on("connection", async ( socket : Socket) =>{
   getSocketId :   console.log(`${socket.id} connected `);

});



server.listen(3001 , ()=> console.log("Server is working on 3001 ") )
