const express = require('express');
const app = express();
const path = require('path');

const messages = [];

// app.get('/', (req, res) => {
//   res.send('<h1>CHAT server</h1>');
// })

//MIDDLEWARE share files from 'clinet' catalog (*.css, *.js)
app.use(express.static(path.join(__dirname, '/client')));

//ENDPOINT run FILE index.html on every path
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

app.listen(8000, () => {
  console.log('Server on port: 8000');
})

//28.3 now !!