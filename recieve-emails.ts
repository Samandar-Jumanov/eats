import { config } from 'dotenv';
import Imap from 'node-imap';
import { promisify } from 'util';

config();

const email: string = process.env.EMAIL || '';
const password: string = process.env.EMAIL_PASSWORD || '';
const host: string = process.env.EMAIL_HOST || '';
const port: number | string = Number(process.env.PORT) || 993; // Assuming a default port of 993 for IMAP

const imap = new Imap({
  user: email,
  password: password,
  host: host,
  port: port,
  tls: true,
});

const openBoxAsync = promisify(imap.openBox.bind(imap));
const fetchAsync = promisify(imap.seq.fetch.bind(imap));

(async function connectImap() {
  try {
    await imap.connect();
    console.log('Imap connected');
  } catch (error: any) {
    console.log(`Error imap: ${error.message}`);
  }
})();

imap.once('ready', async () => {
  try {
    await openBoxAsync('INBOX',);

    // Function to fetch emails
  
      const fetchOptions = { bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'] };
      const fetch : any  = await fetchAsync('1:*', fetchOptions);

      fetch.on('message', async (msg : Object  , seqno : Object) => {
        console.log(`Message seqno #${seqno}`);

        msg.on('body', (stream, info : any ) => {
          let buffer: string = '';
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

   
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }


});
