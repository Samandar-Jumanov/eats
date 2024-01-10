import express , {Application , Request , Response , NextFunction } from 'express'
import * as http from 'http';
import helmet from 'helmet';
import * as path from 'path'
import  cors from 'cors'
import  morgan  from 'morgan'
import socket from './socket';
import { Server } from 'socket.io';
const app : Application = express();
const server = http.createServer(app)
const io = new Server(server);
app.use(cors({
    origin : '*',
    methods :['GET','POST', 'PUT', 'DELETE']
}))


app.use(helmet());
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname , 'public')));


// Socket 
socket(io)
server.listen(3001 , ()=> {
  console.log("Server is working on 3001 ") 
} )
