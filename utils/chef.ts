interface ChefType {
    name : string ,
    Id : string 
}

class Chef {
    public name !: string 
    public Id !: string 
    constructor(name  : string , Id : string)   {
        this.name = name 
        this.Id = Id 
    }  
}


export default Chef ;
