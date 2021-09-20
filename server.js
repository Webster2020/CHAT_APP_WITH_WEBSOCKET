const express = require('express');
const app = express();
const path = require('path');
const socket = require('socket.io');

const messages = [];
const users = [];

//socket.connect("localhost:8000");

// app.get('/', (req, res) => {
  //   res.send('<h1>CHAT server</h1>');
  // })
  
  //MIDDLEWARE share files from 'clinet' catalog (*.css, *.js)
  app.use(express.static(path.join(__dirname, '/client')));
  
  //ENDPOINT run FILE index.html on every path
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
  });
  
  const server = app.listen(8000, () => {
    console.log('Server on port: 8000');
  });

  const io = socket(server);

  io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('join', (user) => {
      console.log('User ' + user.name + ' with id: ' + socket.id + ' join to group!');
      users.push(
        {
          name: user.name,
          id: socket.id
        }
      );
      socket.on('joinNew', (user) => {
        console.log(`${user} has joined the conversation!`);
        socket.broadcast.emit('joinNew', user);
      });
    });
    socket.on('message', (message) => {
      console.log('Oh, I\'ve got something from ' + socket.id);
      messages.push(message);
      socket.broadcast.emit('message', message);
    });
    socket.on('disconnect', () => { 
      console.log('Oh, socket ' + socket.id + ' has left');
      socket.on('userLeft', () => {
        console.log(`${socket.id} has left the conversation!`);
        socket.emit('userLeft', socket.id);
      }); 
    });
    console.log('I\'ve added a listener on message event \n');
  });
