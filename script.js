// Replace with your Render-deployed backend URL
const socket = io('https://icsiamu.onrender.com');

const usernameInput = document.getElementById('username');
const roomInput = document.getElementById('room');
const joinRoomButton = document.getElementById('join-room');
const chatRoom = document.getElementById('chat-room');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

// Join a room
joinRoomButton.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const room = roomInput.value.trim();

  if (username && room) {
    socket.emit('joinRoom', { username, room });
    chatRoom.style.display = 'block';
    usernameInput.style.display = 'none';
    roomInput.style.display = 'none';
    joinRoomButton.style.display = 'none';
  }
});

// Display incoming messages
socket.on('message', (message) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messagesDiv.appendChild(messageElement);
});

// Send a message
sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    socket.emit('chatMessage', message);
    messageInput.value = '';
  }
});
