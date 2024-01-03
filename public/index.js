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
      cancelled: false, // Note: You have duplicate 'Id' property in your order object
    };

    this.orders.push(order);

    if (!this.location) {
      console.log('No location')
    }else {
      socket.emit("send-order", order);
    }

    console.log(this.location);
  }
};

const { latitude ,  longitude } =  findLocation();

socket.emit("userLocation", latitude, longitude);

socket.on("userInfo", function (userInfo) {
  user = new User(userInfo.Id, userInfo.location);
});

socket.on('response-order', (msg) => {
  console.log(msg);
});

sendOrderBtn.addEventListener('click', async () => {
      user.sendOrder(['meals'] , user.Id , user.location)
});



async function findLocation() {
  try {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        throw new Error("Geolocation is not supported by your browser");
      }
    });
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

