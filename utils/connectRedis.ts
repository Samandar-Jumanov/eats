import { createClient } from 'redis'
import * as dotenv from 'dotenv';
dotenv.config();

const redisUrl  = process.env.REDIS_URL

const redisClient = createClient({
    url : redisUrl,
    legacyMode : true ,
})

redisClient.on('error' , (err)=>{
    console.log(err.message)
});

async function initRedis(){
    try {
        await redisClient.connect();
        console.log("Redis connected ")
    } catch (error : any ) {
         console.log(error.message)
    }
};

// initRedis();

export default redisClient
