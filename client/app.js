const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName = '';

const login = function() {
  if (userNameInput.value === '') {
    alert('You input no user name!');
  } else {
    userName = userNameInput.value;
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