class DataHash{
    private  data !:string[][];
    constructor(size= 53 ){
        this.data  = new Array(size).fill(null)
    }

    saveData(key : string , value : string  ){
     let idx = this.#hash(key);
     let newData = [key , value ]
     this.data[idx].push(newData)
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
}


export default DataHash