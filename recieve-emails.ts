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
const fetchAsync = promisify(imap.seq.fetch.bind(imap));

async function connectImap() {
  try {
    await connectAsync();
    console.log('Imap connected');
  } catch (err  ) {
    console.error(`Error connecting to IMAP: ${err.message}`);
    throw err;
  }
}

async function openBox() {
  try {
    await openBoxAsync('INBOX');
  } catch (err  ) {
    console.error(`Error opening mailbox: ${err.message}`);
    throw err;
  }
}

async function fetchEmails() {
  return new Promise<string>((resolve, reject) => {
    const fetchOptions = { bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'] };
    const fetch = imap.seq.fetch('1:*', fetchOptions);

    fetch.on('message', (msg, seqno) => {
      console.log(`Message seqno #${seqno}`);

      msg.on('body', (stream, info) => {
        let buffer = '';
        stream.on('data', (chunk) => {
          buffer += chunk.toString('utf8');
        });

        stream.on('end', () => {
          resolve(buffer);
        });
      });
    });

    fetch.once('error', (err) => {
      reject(err);
    });
  });
}

async function main() {
  try {
    await connectImap();
    console.log('Imap connected');

    await openBox();

    const result = await fetchEmails();
    console.log(result);
    
  } catch (error  ) {
    console.error(`Error: ${error.message}`);
  } finally {
    imap.end();
  }
}

main();
