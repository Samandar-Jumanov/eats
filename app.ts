import express , {Application} from 'express';
import morgan from 'morgan';
import connectRedis from './utils/redisClient';

const app :Application = express()

//middlewares
app.use(morgan('dev'))


connectRedis().then((res )=>{
       console.log(res)
}).then((err : any )=>{
      console.log(err.message)
})
