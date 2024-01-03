const sendOrderBtn = document.getElementById('send-order');
const socket = io("http://localhost:3001");
let Id;
let userLocation = new Map();

findLocation().then((res) => {
  const { lat, long } = res;
  userLocation.set('latitude', lat);
  userLocation.set('longitude', long);

  console.log(userLocation);  // Move the console.log here
}).catch(err => {
  console.log(err);
});

class User {
  constructor(Id, location) {
    this.Id = Id;
    this.orders = [];
    this.location = location;
  }

  sendOrder(meals) {
    let order = {
      Id : this.Id,
      meals: meals,
      location: {  
        latitude: this.location.get('latitude'),
        longitude: this.location.get('longitude')
      },
      rejected: false,
      Id: this.Id
    };

    this.orders.push(order);

    if (this.orders.length !== 0) {
      socket.emit("send-order", order);
    }

    console.log(this.location);
  }
}

socket.on("getId", function (id) {
  Id = id;
});

socket.on("invalid-order", (msg)=>{
  console.log(msg)
})

const user = new User(Id, userLocation);
socket.on('response-order', (msg) => {
  console.log(msg);
});

sendOrderBtn.addEventListener('click', () => {
  user.sendOrder(['fries', 'hamburger']);
  console.log('Order sent');
});

async function findLocation() {
  try {
    if (navigator.geolocation) {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      return { lat: latitude, long: longitude };
    } else {
      throw new Error("Geolocation is not supported by your browser");
    }
  } catch (error) {
    console.error(error.message);
    return null;
  }
}
