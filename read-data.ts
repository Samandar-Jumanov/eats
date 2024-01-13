import hashData from "./saveData"
import { promisify } from 'util'
import redisClient from "./utils/connectRedis";

// create a message queue that is called emails 
// check if exists or no if not create one 
// read data from hashData and redis ;
// Compare them :  if there is a data that has not been added to redis db add it;
// find a way to read it from database and friendly userInterface ;



const brpopAsync = promisify(redisClient.brPop).bind(redisClient);
const queueKey = promisify(redisClient.exists).bind(redisClient);
const addQueue = promisify(redisClient.lPush).bind(redisClient);


async function ifExists() : Promise<boolean>{
    const exists = await queueKey('emails')
    return exists === 1;

}

(async function createQueue(){
     const exisitingQueue = await  ifExists();
     if(exisitingQueue === false ) {
           addQueue('emails')
           return 
     } 
})();


async function readFromDb() : Promise<string[]>  {
      // set data with key to database as an adjancency list 
      const redisData = await brpopAsync('emails', 0);
      console.log(redisData);
      return redisData 
};








