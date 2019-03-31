/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN)
        res.header('Access-Control-Allow-Credentials', true)
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, enctype , Accept, Authorization, Access-Control-Allow-Credentials')
        next()
    })

    app.use('/api/img-processing', require('./api/img-processing'));
    app.use('/api/translate', require('./api/translate'));
    app.use('/api/words', require('./api/words'));

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get(function(req, res) {
            res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        });
};
