//Express app for Pirate Chicks Vintage
'use strict'

const express = require('express');
const cors = require('cors');
const { authenticateJWT } = require('./middleware/auth');
const { NotFoundError } = require('./expressError');

const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authenticateJWT);

//Routes

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);

/**Handle 404 errors */

app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/**Generic error handler for anything unhandled above */

app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== 'test') console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;