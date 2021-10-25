'use strict'

/** Config for application as a whole */

require('dotenv').config();
require('colors');

//Common config for Pirate Chicks Vintage

const SECRET_KEY = process.env.SECRET_KEY ||'sk_test_51JoBGWE464iRZKxIQKltbapqxNaCm88utZqad6E2dXuGmq5JUQIwP7m7R4RIDym7DWTDc5bHIi4bG2R8GpAsCJc600XQRFBgyk'
//const SECRET_KEY = process.env.SECRET_KEY || 'secret-dev';

const PORT = +process.env.PORT || 3001;

const WEB_APP_URL = process.env.WEB_APP_URL || 'http://localhost:3000';

/** Use either app database or testing database */
function getDatabase() {
    return(process.env.NODE_ENV === 'test')
        ? 'piratechicks_test'
        : process.env.DATABASE_URL || 'piratechicks';
}

/** Speed up bcrypt for testing */
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === 'test' ? 1 : 12;

console.log('Pirate Chicks Config:'.green);
console.log('SECRET_KEY:'.yellow, SECRET_KEY);
console.log('PORT:'.yellow, PORT.toString());
console.log('BCRYPT_WORK_FACTOR'.yellow, BCRYPT_WORK_FACTOR);
console.log('Database:'.yellow, getDatabase());
console.log('---');

module.exports = {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabase, 
    WEB_APP_URL
};