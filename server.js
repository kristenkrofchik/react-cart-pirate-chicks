//Server startup for Pirate Chicks Vintage

'use strict'

const app = require('./app');
const path = require('path');
const { PORT } = require('./config');

app.use(express.static(path.join(__dirname, './frontend/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './frontend/build', 'index.js'));
});


app.listen(PORT, function() {
    console.log(`Server started on port ${PORT}`);
});

