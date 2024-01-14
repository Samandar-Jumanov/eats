declare module 'node-mailin' {
    interface MailinOptions {
      port?: number;
      disableWebhook?: boolean;
      logFile?: string;
      logLevel?: string;
     
    }
  
    interface ParsedData {
      from: string;
      subject: string;
      text?: string;
      html?: string;
      attachments?: any[]; 
    }
  
    interface Connection {
      accept(): void;
    }
  
    class Mailin {
      static start(options: MailinOptions): void;
      static on(event: string, callback: (connection: Connection, data: ParsedData, content: any) => void): void;
    }
  
    export { Mailin, ParsedData, Connection };
  }
  