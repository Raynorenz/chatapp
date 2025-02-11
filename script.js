const firebaseConfig = {
  apiKey: "AIzaSyC8BeR4PZs8FZ9A_-VzJNHGxDUv91rE7Nw",
  authDomain: "sample-chat-b0eb5.firebaseapp.com",
  databaseURL: "https://sample-chat-b0eb5-default-rtdb.firebaseio.com",
  projectId: "sample-chat-b0eb5",
  storageBucket: "sample-chat-b0eb5.firebasestorage.app",
  messagingSenderId: "396724640418",
  appId: "1:396724640418:web:3219b603506276844655fb",
  measurementId: "G-WY83YP0MKL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const messagesRef = db.ref('messages');

const messageInput = document.getElementById('message-input');
const sendMessageBtn = document.getElementById('send-message');
const messagesContainer = document.getElementById('messages');

let username = localStorage.getItem('username');
if (!username) {
  window.location.href = 'index.html';
}

function loadMessages() {
  if (!messagesContainer) {
    console.error("Messages container is missing.");
    return;
  }

  messagesRef.on('child_added', function(snapshot) {
    const message = snapshot.val();
    const messageElement = document.createElement('div');
    const innerDiv = document.createElement('div'); // Create inner div
    const messageContent = document.createElement('div');
    const usernameElement = document.createElement('div');
    
    messageContent.textContent = message.text;
    usernameElement.textContent = message.username;

    messageContent.classList.add('text');
    usernameElement.classList.add('name');
    
    innerDiv.appendChild(usernameElement);
    innerDiv.appendChild(messageContent);
    messageElement.appendChild(innerDiv);

    messageElement.classList.add('message');
    if (message.username === username) {
      messageElement.classList.add('my-chat');
    } else {
      messageElement.classList.add('other-chat');
    }

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll to the latest message
  });
}

function sendMessage() {
  const messageText = messageInput.value.trim();

  if (messageText) {
    messagesRef.push({
      username: username,
      text: messageText
    });
    messageInput.value = ''; // Clear the input field after sending
  }
}

sendMessageBtn.addEventListener('click', sendMessage);

window.onload = function() {
  loadMessages(); // Load messages once the page is fully loaded
};
