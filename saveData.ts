import DataHash from "./hash-data";
import init from "./recieve-emails";
import redisClient from "./utils/connectRedis";

const hashData = new DataHash();

async function checkData ()  : Promise<null | string[]> {
  // check if there is a new data 
  // if there return data or return false 
    const res : string[] = await init();
    let searchKey = res[0]
    const isFound =   hashData.search(searchKey);
    
    return isFound === true ? res :  null
}


async function saveData() : Promise<void | null> {
       // check if there any data 
       // if there save it 
       // or return null 
       const result : string[] = await  checkData();
       if(result === null ){
             hashData.saveData(result[0] , result[1])
             return 
       }

       return null;
}


setInterval( async ()=>{
       await saveData()
} , 1000);


(async function subscribe() : Promise<void> {
    // subscribe user with only emails 
    
        await redisClient.subscribe('emails' , ()=>{
                console.log("Subsribed")
        })
})();








