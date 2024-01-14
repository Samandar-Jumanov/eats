import  {RedisClientOptions , createClient} from 'redis';
import { config } from 'dotenv';

config(); // config dotenv

const redisUrl = process.env.REDIS_URL;
const redisClientOps  : RedisClientOptions = { 
  url:redisUrl
}
const redisClient =  createClient(redisClientOps);

function connectRedis() {
  return new Promise<void>((resolve, reject) => {
    redisClient.on('connect', () => {
      console.log('Connected to Redis');
      resolve();
    });

    redisClient.on('error', (err) => {
      console.error('Redis connection error:', err);
      reject(err);
    });
  });
}

export default connectRedis;
