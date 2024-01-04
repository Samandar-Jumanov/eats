window.onload = function () {
  initMap();
};

const sendOrderBtn = document.getElementById('send-order');
const socket = io("http://localhost:3001");
let user;
let userOrder = 0 
const order =   Math.floor(Math.random(1 , 3 ));

const fetchData = async () =>{
  await fetch('data.json').then(res =>{
        let data = res.json();
         console.log(data)
  }).catch(err =>{
    console.log(err)
  })
};

fetchData();


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
      cancelled : false, 
    };

    this.orders.push(order);

    if (this.location === undefined) {
      console.log('No location');
    } else {
      socket.emit("send-order", order);
    }

    console.log(this.location);
  }
}

async function init() {
  try {
    const location = await findLocation();

    if (location !== null) {
      socket.emit("userLocation", location.latitude, location.longitude);
    }

    socket.on("userInfo", function (userInfo) {T
      user = new User(userInfo.Id, userInfo.location);
    });

    socket.on('response-order', (msg) => {
      console.log(msg);
    });

    sendOrderBtn.addEventListener('click', async () => {
      if (user) {
        user.sendOrder(['meals'] , user.location);
      } else {
        console.log('User not initialized');
      };
      
    });
  } catch (error) {
    console.error(error.message);
  }
}

init();

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
        reject(new Error("Geolocation is not supported by your browser"));
      }
    });
  } catch (error) {
    console.error(error.message);
    return null;
  }
}
