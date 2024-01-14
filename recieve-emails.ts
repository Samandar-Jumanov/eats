import { Mailin , ParsedData , Connection } from 'node-mailin';

Mailin.start({
    port: 25,
    disableWebhook: true,
    logLevel: 'info',
});

async function recieveEmails() {
    Mailin.on('message', (connection : Connection , data :ParsedData, content : any ) => {
        console.log('New email received:');
        console.log('From:', data.from);
        console.log('Subject:', data.subject);
        console.log('Text body:', data.text || '');
        console.log('HTML body:', data.html || '');
        console.log('Attachments:', data.attachments || []);
    
        connection.accept();
    
        return data 
    });
     
}

export default recieveEmails