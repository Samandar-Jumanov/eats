const createRoomBtn = document.getElementById('create-room-btn');
const roomInput = document.getElementById('room-name')
const nameInput = document.getElementById('name')
const socket = io('/');


createRoomBtn.addEventListener('click' , () =>{
  if(roomInput.value == "" || nameInput !== ""){
      alert("Enter a name to create a room ")
    }else {
      socket.emit("create-room" , roomInput.value );
  }
});
