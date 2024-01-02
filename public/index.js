const sendOrderBtn = document.getElementById('send-order')
const socket = io("http://localhost:3001");

socket.on("getId", function (id) {
  const user = new User(id); 

  sendOrderBtn.addEventListener('click', () => {
    user.sendOrder(['fries', 'hamburger'], { city: 'Tashkent' });
    console.log('Order sent ');
  });


});

socket.on('response-order', (msg)=>{
    console.log(msg)
})

class User {
  constructor(Id) {
    this.Id = Id;
    this.orders = [];
  };

  sendOrder(meals, location) {
    let order = {
      meals: meals,
      location: location,
      rejected: false,
      Id : this.Id
    }
    this.orders.push(order);
    socket.emit("send-order", order);
  }
}
