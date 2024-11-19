// Replace this URL with your backend's live Render URL
const socket = io('https://icsi-amu.onrender.com');

// Get DOM elements
const createRoomBtn = document.getElementById('createRoom');
const joinRoomBtn = document.getElementById('joinRoom');
const roomIDInput = document.getElementById('roomID');
const usernameInput = document.getElementById('username');
const chatScreen = document.getElementById('chatScreen');
const chatMessages = document.getElementById('messages');
const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('send');

// Store room and username
let roomID = '';
let username = '';

// Create a room
createRoomBtn.addEventListener('click', () => {
  username = usernameInput.value.trim();
  if (!username) {
    alert('Enter a username!');
    return;
  }

  roomID = Math.random().toString(36).substr(2, 8); // Generate random room ID
  alert(`Your Room ID: ${roomID}`);
  socket.emit('createRoom', { username, roomID });
  enterChatRoom();
});

// Join a room
joinRoomBtn.addEventListener('click', () => {
  username = usernameInput.value.trim();
  roomID = roomIDInput.value.trim();

  if (!username || !roomID) {
    alert('Enter both username and Room ID!');
    return;
  }

  socket.emit('joinRoom', { username, roomID });
  enterChatRoom();
});

// Enter chat room screen
function enterChatRoom() {
  document.getElementById('roomSetup').style.display = 'none';
  chatScreen.style.display = 'block';
}

// Send a message
sendBtn.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (!message) return;

  socket.emit('chatMessage', { roomID, username, message });
  messageInput.value = '';
});

// Display incoming messages
socket.on('message', (data) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = `${data.username}: ${data.message}`;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
});
