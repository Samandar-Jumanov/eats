import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoDBConnection from './utils/connect-mongo';
import { socketServer } from './controller/socket-server';
import {ExpressPeerServer } from 'peer';



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});


const peerServer = ExpressPeerServer(server, {
  proxied: true,
  path: "/",
});


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


app.use( express.static('public'))
app.set('view engine' , 'ejs');
app.use('peerjs' , peerServer)


app.get('/' , ( request , response) =>{
    response.render('index')
})

mongoDBConnection();
socketServer(io);



const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

