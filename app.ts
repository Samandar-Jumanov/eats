import express , {Application  , Request , Response  } from 'express'
import * as http from 'http';
import helmet from 'helmet';
import  cors from 'cors'
import  morgan  from 'morgan'
import socket from './socket';
import { Server } from 'socket.io';

import DataHash from "./hash-data";
import init from "./recieve-emails";

const app : Application = express();
const server = http.createServer(app)
app.use(express.json());

const io = new Server(server);

const hashData = new DataHash();

async function checkData() {

  const res = await init();

  if (res) {
    let searchKey = res[0];
    const isFound = hashData.search(searchKey);
      if(isFound !== true ){
          hashData.saveData(res[0] , res[1])
      }
  }

    return hashData.data;
}

  const res = init();
  res.then(res =>{
       console.log(res)
  }).catch(err =>{
         console.log(err?.message)
  })



app.use(cors({
    origin : '*',
    methods :['GET','POST', 'PUT', 'DELETE']
}))


app.use(helmet());
app.use(morgan('dev'));

checkData()
app.get('/', async ( request  : Request , response : Response  )=>{
     
          const data =  hashData.data 
            response.json({
              data 
        })
})

// Socket 
socket(io);

// init()
server.listen(3001, ()=> {
  console.log("Server is working on 3001 ") 
} )


// setInterval( async ()=>{
//   await checkData();
    
// } , 1000);

