import express , {Application} from 'express';
import morgan from 'morgan';
import connectRedis from './utils/redisClient';


const app :Application = express()

app.use(morgan('dev'))


connectRedis().then((res )=>{
       console.log(res)
}).then((err : any )=>{
      console.log(err.message)
})


app.get('/all' , )


app.listen(3001 , ()=>{
        console.log("Http server started ")
})




