import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoDBConnection from './utils/connect-mongo';
import { sockerServer } from './controller/socket-server';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


app.use('/' , express.static('public'))
app.set('view engine' , 'ejs');

app.get('/' , (request , response ) =>{
    response.render('index')
});
app.get('/video-chat' , ( reuqest , response ) =>{
     response.render('video-chat');
});

mongoDBConnection();
sockerServer(io);



const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

