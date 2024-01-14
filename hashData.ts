class  HashData {
    public data !: string[][];
    constructor(){
        this.data = [] // consider as adjancecny list or (linear probing )
    };

      saveData( data : string[]){
        let idx : number  =  this.#hash(data[0]);
        if(this.data[idx] === null ){
             this.data[idx] = data 
        }else {
                while(this.data[idx] === null){
                      idx++
                }
                this.data[idx] = data 
        }
        return true 
      }

    #hash(key : string ){
      let total = 0 ;
      const prime = 17 ;

      for(let i = 0 ; i < key.length ; i++){
          let value = key[0].charCodeAt(0) - 96 ;
          total = (total * prime + value ) % value 
      }

      return total
    };

    
}