import express , {Application } from 'express'
import * as http from 'http';
import helmet from 'helmet';
import  cors from 'cors'
import  morgan  from 'morgan'
import socket from './socket';
import { Server } from 'socket.io';
// import { fetchEmails} from './recieve-emails'
const app : Application = express();
const server = http.createServer(app)
app.use(express.json());

const io = new Server(server);

// init();


app.use(cors({
    origin : '*',
    methods :['GET','POST', 'PUT', 'DELETE']
}))


app.use(helmet());
app.use(morgan('dev'));

// Socket 
socket(io);

// fetchEmails()


server.listen(3001, ()=> {
  console.log("Server is working on 3001 ") 
} )


