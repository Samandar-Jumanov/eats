import { createClient } from 'redis';
import { config } from 'dotenv';
config(); // config dotenv

const redisUrl: string = String(process.env.REDIS_URL);
const redisClient = createClient(redisUrl);

async function connectRedis() {
  try {
    await redisClient.connect();
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default connectRedis;
