const configs = {
    development: {
      SERVER_URI: 'localhost:3001',
    },
    production: {
      SERVER_URI: 'https://react-pirate-chicks.herokuapp.com/',
    },
  };
  
  module.exports.config = configs[process.env.NODE_ENV];