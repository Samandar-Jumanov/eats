import  mongoose , { connect } from 'mongoose';
import { config } from 'dotenv';

config();

const connectionUrl  : string = String(process.env.MONGO_URL)
async function mongoDBConnection() {
    try {
        await connect(connectionUrl , {
          
        });

        console.log("Connected to mongo")
    } catch (error : any ) {
          console.log(error.message)
    }
}
const dbConnection  = mongoose.connection;

dbConnection.on("error" , ( error : any ) =>{
      console.log(error.message)
});



export default mongoDBConnection
