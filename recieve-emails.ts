import * as dotenv from 'dotenv';
import  Imap from 'node-imap'

dotenv.config();

const email : string = process.env.EMAIL;
const password : string = process.env.EMAIL_PASSWORD ;
const host : string = process.env.EMAIL_HOST ;
const port : number = process.env.PORT;


const imap = new Imap({
    user: email,
    password: password,
    host: host ,
    port: port ,
    tls: true,
});


imap.once('ready', ()=>{
      console.log("Imap connnected ")
});



(async function connectImap(){
    try {
    await imap.connect();
     console.log('Imap connected')
    } catch (error : any  ) {
          console.log(` Error imap : ${error.message}`)
    }    
})();
