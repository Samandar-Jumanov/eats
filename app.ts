import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoDBConnection from './utils/connect-mongo';
import { sockerServer } from './controller/socket-server';
// import path from 'path';
// import { ExpressPeerServer } from 'peer';

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




// MongoDB and Socket.io setup
mongoDBConnection();
sockerServer(io);

app.get('/', (req, res) => {
  res.render('client');
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
