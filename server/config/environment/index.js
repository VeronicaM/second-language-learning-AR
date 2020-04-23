'use strict';
var _ = require('lodash');
var path = require('path');

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,

    // Server port
    port: process.env.PORT || 9000,

    // Server IP
    ip: process.env.IP || '0.0.0.0',
     // Root path of server
    root: path.normalize(__dirname + '/../../..'),
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {});
