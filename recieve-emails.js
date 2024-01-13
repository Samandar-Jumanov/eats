const inbox = require('inbox');
const dotenv = require('dotenv');
const { promisify } = require('util'); // Import promisify from the util module

dotenv.config();

const email = String(process.env.EMAIL);
const password = String(process.env.EMAIL_PASSWORD);

const clientInbox = inbox.createConnection(993, 'imap.gmail.com', {
  secureConnection: true,
  auth: { user: 'jumanovsamandar005@gmail.com', pass: 'workGmailPassword123' },
});

(async function connectInbox() {
  await clientInbox.connect();
  console.log('Connected to IMAP');
})();

// Use promisify from the util module
const openMailboxAsync = promisify(clientInbox.openMailbox.bind(clientInbox));
// const fetchEmailBodyAsync = promisify(clientInbox.fetch.bind(clientInbox));

async function fetchEmails() {
  try {
    await openMailboxAsync('INBOX');
    console.log('Opened')
    // const res = await fetchEmailBodyAsync();
    // console.log(res);
    // return res;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { fetchEmails };
