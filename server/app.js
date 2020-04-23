/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
try {
    var dotenv = require('dotenv');
    dotenv.config();
} catch (ex) {
    console.log('.env not found!');
}

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

var bodyParser = require('body-parser')

// Connect to database
mongoose.connect(config.mongo.uri, {
    socketTimeoutMS: 0,
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

// Setup server
var app = express();
var server = require('http').createServer(app);

require('./config/express')(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json({ limit: '50mb' }))

require('./routes')(app);
// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    console.log('URL:', `http://localhost:${config.port}`);
});

// Expose app
exports = module.exports = app;
