'use strict';
var _ = require('lodash');
var path = require('path');
function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

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
    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    },
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {});
