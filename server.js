//Server startup for Pirate Chicks Vintage

'use strict'

const app = require('./app');
const path = require('path');
const express = require('express');
const { PORT } = require('./config');

app.use(express.static(path.join(__dirname, './frontend/src')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './frontend/src', 'index.js'));
});


app.listen(PORT, function() {
    console.log(`Server started on port ${PORT}`);
});

