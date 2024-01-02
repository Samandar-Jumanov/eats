interface Location {
    city : string ,
    lattitude : number ,
    longtitude : number 
}

interface OrderType {
    userId : string ,
    location : Location ,
    meals : string[]
}


export default OrderType