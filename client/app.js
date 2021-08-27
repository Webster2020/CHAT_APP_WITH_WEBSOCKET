const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

const socket = io();
//socket.connect("localhost:8000");
// socket.on('message', addMessage);
// socket.on('message', (event) => addMessage(event.author, event.content))
socket.on('message', ({ author, content }) => addMessage(author, content));

socket.on('joinNew', (user) => addMessage('ChatBot', `${user} has joined the conversation!`));

socket.on('userLeft', () => addMessage('ChatBot', `${socket.id} has left the conversation!`));

// socket.on('joinNewUser', (author, content) => addMessage(author, content));

let userName = '';

const login = function() {
  if (userNameInput.value === '') {
    alert('You input no user name!');
  } else {
    userName = userNameInput.value;
    socket.emit('join', {name: userName});
    socket.emit('joinNew', userName);
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
  console.log(userName);
}

const sendMessage = function(e) {
  e.preventDefault();
  if (messageContentInput.value === '') {
    alert('Empty message!');
  } else {
    addMessage(userName, messageContentInput.value);
    socket.emit('message', { author: userName, content: messageContentInput.value })
    messageContentInput.value = '';
  }
}

const addMessage = function(author, msgContent) {
  console.log(author, msgContent);
  let msg = `
  <li class="message message--received ${author === userName ? 'message--self' : null}">
    <h3 class="message__author">${author === userName ? 'You' : author}</h3>
    <div class="message__content">
      ${msgContent}
    </div>
  </li>
  `
  messagesList.insertAdjacentHTML("beforeend", msg);
}

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  login();
});

addMessageForm.addEventListener('submit', function(e) {
  e.preventDefault();
  sendMessage(e);
});

