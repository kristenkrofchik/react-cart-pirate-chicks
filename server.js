//Server startup for Pirate Chicks Vintage

'use strict'

const app = require('./app');
const { PORT } = require('./config');

app.listen(PORT, function() {
    console.log(`Started on http://localhost:${PORT}`);
});

if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
  }