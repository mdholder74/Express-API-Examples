// EXAMPLE 4 (Middleware)
const moment = require('moment');// This is used to work with dates and times

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);// This logs the URL of the request
    console.log('Successfully connected to the server. This will run for every request');
    next();// This is used to move to the next middleware function in the stack
};

module.exports = logger;