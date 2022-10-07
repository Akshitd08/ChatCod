import io from "socket.io-client";
const socket = io('https://akshitd08.github.io/ChatCord/');
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//get user name and room from url
const{username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});
socket.emit('joinRoom', {username,room});
//message from server
socket.on('message', (message) => {
    console.log(message);
    outputMess(message);
});

//get room and user
socket.on('roomUsers', ({room,users}) => {
    outputRoomName(room);
    outputUsers(users);
});
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get text message
    const msg = e.target.elements.msg.value;
    //emmiting it to server.js
    socket.emit('chatMessage',msg);
    
    //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
    
});

function outputMess(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span style='float:right;margin-top:25px;'>  ${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
    console.log(message);
}

//output room name
function outputRoomName(room){
    roomName.innerText = room;
}

//add user name
function outputUsers(users){
    userList.innerHTML = `${users.map(user =>`<li>${user.username}</li>`).join('')}`;
}