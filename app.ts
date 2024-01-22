import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoDBConnection from './utils/connect-mongo';
import { sockerServer } from './controller/socket-server';
import path from 'path';
import { ExpressPeerServer } from 'peer';

const app: Application = express();
const server = http.createServer(app);
const peerServer = ExpressPeerServer(server , {
  path : '/peer'
});

const io: Server = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Configure EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use('/', peerServer); // Use the PeerServer middleware for the /peer path
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
// Routes
app.get('/', (request: Request, response: Response) => {
  response.render('client');
});

// MongoDB and Socket.io setup
mongoDBConnection();
sockerServer(io);

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
