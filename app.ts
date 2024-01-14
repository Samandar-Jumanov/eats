import express , {Application} from 'express';
import morgan from 'morgan';
import connectRedis from './utils/redisClient';
import net  , { Socket} from 'net';


const app :Application = express()

//middlewares
app.use(morgan('dev'))


connectRedis().then((res )=>{
       console.log(res)
}).then((err : any )=>{
      console.log(err.message)
})



   const tcpServer  = net.createServer((socket : Socket ) =>{
     socket.write("Wasssup homie");
     setTimeout(()=>{
        console.log("Ending socket ")
          socket.end();
     } , 1000)


     socket.on('data' , ( data :string[] ) =>{
        console.log(data);
        
     })
});

tcpServer.listen(1337 , ()=>{
          console.log('tcp server is working ')
})


app.listen(3001 , ()=>{
        console.log("Http server started ")
})




