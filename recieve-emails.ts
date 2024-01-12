import { config } from 'dotenv';
import Imap from 'node-imap';
import { promisify } from 'util';

config();


const email = process.env.EMAIL || '';
const password = process.env.EMAIL_PASSWORD || '';
const host = process.env.EMAIL_HOST || '';
const port = Number(process.env.PORT) || 993; // Assuming a default port of 993 for IMAP

const imap = new Imap({
  user: email,
  password: password,
  host: host,
  port: port,
  tls: true,
});

const connectAsync = promisify(imap.connect.bind(imap));
const openBoxAsync = promisify(imap.openBox.bind(imap));

async function connectImap() : Promise<void> {
  try {
    await connectAsync();
  } catch (err  ) {
    console.error(`Error connecting to IMAP: ${err.message}`);
    throw err;
  }
}
connectImap();


(
async function openBox() : Promise<void> {
  try {
    await openBoxAsync('INBOX');
  } catch (err  ) {
    console.error(`Error opening mailbox: ${err.message}`);
    throw err;
  }
})()

async function fetchEmails() {
  return new Promise<string[]>((resolve, reject) => {
    const fetchOptions = { bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'] };
    const fetch = imap.seq.fetch('1:*', fetchOptions);

    fetch.on('message', (msg, seqno) => {
      let seq = seqno
      console.log(`Message seqno #${seqno}`);

      msg.on('body', (stream, info) => {
        let buffer = '';
        stream.on('data', (chunk) => {
          buffer += chunk.toString('utf8');
        });
        let data : string[]= [(msg.headers['from'] || [''])[0] , buffer  ]
 
        stream.on('end', () => {
          resolve(data);
        });
      });
    });

    fetch.once('error', (err) => {
      reject(err);
    });
  });
}



async function init() {
  try {

    const result : string[] = await fetchEmails();
    return result 
  } catch (error : any   ) {
    console.error(`Error: ${error.message}`);
  } finally {
    imap.end();
  }
}

export default init

