import redisClient from "./utils/connectRedis";

async function checkData () : Promise<boolean> {
    

    return false
}



async function saveData() {
       const result = await checkData();
       const consumer = await redisClient.duplicate();
       await consumer.subscribe('emails' , ())
}