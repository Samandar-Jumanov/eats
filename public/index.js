const sendOrderBtn = document.getElementById('send-order')
const socket = io("http://localhost:3001");
let Id;

socket.on("getId", function (id) {
  Id = id;
  const user = new User(Id); 

  sendOrderBtn.addEventListener('click', () => {
    user.sendOrder(['fries', 'hamburger'], { city: 'Tashkent' });
    console.log('Order sent ');
  });
});

class User {
  constructor(Id) {
    this.Id = Id;
    this.orders = [];
  };

  sendOrder(meals, location) {
    let order = {
      meals: meals,
      location: location,
      rejected: false
    }

    this.orders.push(order);
    socket.emit("send-order", order);
  }
}
