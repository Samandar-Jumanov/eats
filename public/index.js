const sendOrderBtn = document.getElementById('send-order');
const socket = io("http://localhost:3001");
let user;

class User {
  constructor(Id, location) {
    this.Id = Id;
    this.orders = [];
    this.location = location;
  }

  sendOrder(meals) {
    let order = {
      Id: this.Id,
      meals: meals,
      location: {
        latitude: this.location.latitude,
        longitude: this.location.longitude
      },
      rejected: false, // Note: You have duplicate 'Id' property in your order object
    };

    this.orders.push(order);

    if (this.orders.length !== 0) {
      socket.emit("send-order", order);
    }

    console.log(this.location);
  }
}

socket.on("userInfo", function (userInfo) {
  user = new User(userInfo.Id, userInfo.location);
});

socket.on('response-order', (msg) => {
  console.log(msg);
});

sendOrderBtn.addEventListener('click', async () => {
  const result = await findLocation();
  if (result) {
    const { latitude, longitude } = result.coords;
    socket.emit("userLocation", latitude, longitude);
    user.sendOrder(['fries', 'hamburger']);
    console.log('Order sent');
  }
});

async function findLocation() {
  try {
    if (navigator.geolocation) {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

     
      

      return {
        latitude: latitude,
        longitude: longitude,
      };
      
    } else {
      throw new Error("Geolocation is not supported by your browser");
    }
  } catch (error) {
    console.error(error.message);
    return null;
  }
}
