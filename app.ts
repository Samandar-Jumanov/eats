import express , {Application } from 'express'
import * as http from 'http';
import helmet from 'helmet';
import  cors from 'cors'
import  morgan  from 'morgan'
import socket from './socket';
// import { Mailin } from 'node-mailin'
import { Server } from 'socket.io';
import recieveEmails from './recieve-emails';
const app : Application = express();

const server = http.createServer(app)
app.use(express.json());

const io = new Server(server);

// Mailin.start({
//    port: 25,
//    disableWebhook: true,
//   logLevel :'info'
// });



app.use(cors({
    origin : '*',
    methods :['GET','POST', 'PUT', 'DELETE']
}))


app.use(helmet());
app.use(morgan('dev'));

socket(io);

recieveEmails();

server.listen(3001, ()=> {
  console.log("Server is working on 3001 ") 
} )


