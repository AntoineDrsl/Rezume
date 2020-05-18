const express = require('express');
var app = express();
var server = require('http').createServer(app);

//IO
var io = require('socket.io').listen(server);
var connectedUsers = [];

io.on('connection', (socket) => {
    console.log('new People');
    socket.emit('coucou')
})