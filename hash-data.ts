class TreeHash{
     data !: string[][];
    constructor(){
        this.data = [];
    }

    saveData(key : string , value : string  ){
     let idx = this.#hash(key);
      this.data[idx].push([key , value] )
    
    
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