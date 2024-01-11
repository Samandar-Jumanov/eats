import {config} from 'dotenv';
import  Imap from 'node-imap'

config();


const email : string = process.env.EMAIL || ''
const password : string = process.env.EMAIL_PASSWORD || ''
const host : string = process.env.EMAIL_HOST ||''
const port : number = Number(process.env.PORT)


const imap = new Imap({
    user: email,
    password: password,
    host: host ,
    port: port ,
    tls: true,
});



(async function connectImap(){
    try {
        await imap.connect();
     console.log('Imap connected')
    } catch (error : any  ) {
          console.log(` Error imap : ${error.message}`)
    }    
})();



imap.once('ready', async () => {
    await imap.openBox('INBOX', true, (err) => {
      if (err) throw err;
  
      // Function to fetch emails
      const fetchEmails = async () => {
        const fetchOptions = { bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'] };
        const fetch = imap.seq.fetch('1:*', fetchOptions);
        fetch.on('message', (msg, seqno) => {
          console.log(`Message seqno #${seqno}`);
          msg.on('body', (stream, info) => {
            let buffer = '';
            stream.on('data', (chunk) => {
              buffer += chunk.toString('utf8');
            });
            stream.on('end', () => console.log(buffer));
          });
        });
  
        fetch.once('end', () => {
          console.log('No more tasks');
        });
      };
  
     
      setInterval(fetchEmails, 1000); // 1 second
    });
  });
  



