import express , {Application , Request , Response } from 'express';
import morgan from 'morgan';
import http from 'http';
import { Server , Socket  } from 'socket.io'
import cors from 'cors'
import CallUserData from './interface';
const app :Application = express()

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
    // credentials: true,
  },
});

app.use(morgan('dev'))
app.use(express.json());
app.use(cors());


io.on('connection' , (socket : Socket ) =>{
       console.log(socket.id);
       socket.emit('me' , socket.id);


       socket.on('disconnect' , () =>{
           socket.broadcast.emit("call-ended")
       });

       socket.on('call-user' , (data : CallUserData ) =>{
               io.to(data.userToCall).emit("call-user" , {
                    signal : data.signalData,
                    from : data.name 
               })
       });

       socket.on("answer-call" , (data : any ) =>{
             io.to(data.to).emit('call-accepted' , data.signal)
       })
})

app.get('/' , ( request : Request , response : Response ) => {
            response.json({
                message :' Hello world '
            })
})



server.listen(3001, () =>{
          console.log("Server is running ")
});




