class DataHash{
    public  data !:string[][]
    constructor( ){
        this.data  = [];
    }

    saveData(key : string , value : string  ){
     let idx = this.#hash(key);
     let newData : string[] = [key , value ];
      
       if(this.data[idx] !== null){
        
        while(this.data[idx] === null){
            idx += 1 ;
         };
    }

      this.data[idx] = newData;
     return  true 
   }


    #hash(key : string ){
       let  total = 0
       const prime = 17 // reduce collisions 
       for(let i = 0 ; i < key.length ; i++){
           let value = key[i].charCodeAt(0);
           total = (total * prime + value ) % value ;
       }

       return total;
    }

    search(key : string ){
       let  idx = this.#hash(key);
       if(!this.data[idx])  return false 
       return true
    };
     
    compareData(redisData : string[]){
            if(this.data.length > redisData.length ){
                   
            };

    }


};


export default DataHash;