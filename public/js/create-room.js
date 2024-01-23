const createRoomBtn = document.getElementById('create-room-btn');
const roomInput = document.getElementById('room-name')
const nameInput = document.getElementById('user-name')
const socket = io('/');



createRoomBtn.addEventListener('click' , () =>{
  if(roomInput.value == "" || nameInput == ""){
      alert("Enter a name to create a room ")
    }else {
        const data = {
             roomName : roomInput.value,
             adminName : nameInput.value  
        };
      socket.emit("create-room" , roomInput.value );
  }
});


