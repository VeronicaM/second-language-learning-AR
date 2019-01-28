/**
* Express configuration
*/

'use strict';
var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var errorHandler = require('errorhandler');
var config = require('./environment');

module.exports = function (app) {
    var env = app.get('env');
    console.log(env, config);
    app.set('appPath', path.join(config.root, 'src'));
    app.use(express.static(path.join(config.root, 'src')));
    app.use(errorHandler()); // Error handler - has to be last
};