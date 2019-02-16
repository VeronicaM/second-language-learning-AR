'use strict';

var mongoose = require('mongoose');

var WordSchema = new mongoose.Schema({
    text: String
});

WordSchema.virtual('id').get(function() {
    return this._id;
});

module.exports = mongoose.model('Word', WordSchema);
