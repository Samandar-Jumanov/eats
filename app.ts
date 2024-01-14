import express , {Application , Request , Response } from 'express';
import morgan from 'morgan';
import http from 'http';
import { Server , Socket  } from 'socket.io'
import cors from 'cors'

const app :Application = express()
app.use(morgan('dev'))
app.use(express.json());

app.use(cors());

const server = http.createServer(app);
const io = new Server(server);

io.on('connection' , ( socket:Socket   ) =>{
    console.log(socket.id);

    socket.on("offer" , (data : string ) =>{
          console.log(data)
    })
    
    socket.on("message" , ( data : string ) =>{
        socket.broadcast.emit("offer" , data )
     })

    socket.on('answer', (data) => {
        socket.broadcast.emit('answer', data);
    });
    
    socket.on('ice-candidate', (data) => {
        socket.broadcast.emit('ice-candidate', data);
    });
    
        socket.on('disconnect' , () =>{
             console.log(`User disconnected ${socket.id}`)
        });
});



app.get('/' , ( request : Request , response : Response ) => {
            response.json({
                message :' Hello world '
            })
})



app.listen(3001, () =>{
          console.log("Server is running ")
})



