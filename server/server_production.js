// Starts the production server, using the `dist` directory
const express = require('express');
const path = require('path');
const api = require('./api');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = parseInt(process.env.PORT) || 8000;

app.use(express.static(path.join(__dirname, '../dist')));
app.use(api);

io.on('connection', api.onSocket);

http.listen(PORT);

// eslint-disable-next-line no-console
console.log('Production Server running at http://localhost:'+PORT);
