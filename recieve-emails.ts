import { config } from 'dotenv';
import Imap from 'node-imap';
import { simpleParser } from 'mailparser';
import { promisify } from 'util';

config();

const email = process.env.EMAIL || '';
const password = process.env.EMAIL_PASSWORD || '';
const host = process.env.EMAIL_HOST || '';
const port = Number(process.env.PORT) || 993;

const imap = new Imap({
  user: email,
  password: password,
  host: host,
  port: port,
  tls: true,
});

const connectAsync = promisify(imap.connect.bind(imap));
const openBoxAsync = promisify(imap.openBox.bind(imap));

async function connectImap(): Promise<void> {
  try {
    await connectAsync();
  } catch (err: any) {
    console.error(`Error connecting to IMAP: ${err.message}`);
    throw err;
  }
}
connectImap();

(async function openBox(): Promise<void> {
  try {
    await openBoxAsync('INBOX');
  } catch (err: any) {
    console.error(`Error opening mailbox: ${err.message}`);
    throw err;
  }
})();

async function fetchEmails() {
  return new Promise<string[]>((resolve, reject) => {
    const fetch = imap.seq.fetch('1:*', { bodies: [''] });
    fetch.on('message', (msg, seqno) => {
      let seq = seqno;
      console.log(`Message seqno #${seq}`);

      msg.on('body', (stream, info) => {
        let buffer = '';
        stream.on('data', (chunk) => {
          buffer += chunk.toString('utf8');
        });

        stream.on('end', async () => {
          try {
            const parsed = await simpleParser(buffer);
            const data: string[] = [(parsed.from?.text || ''), buffer];
            resolve(data);
          } catch (error) {
            reject(error);
          }
        });
      });
    });

    fetch.once('error', (err) => {
      reject(err);
    });

  });
}

async function init(): Promise<string[]> {
  try {
    const result: string[] = await fetchEmails();
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default init;
