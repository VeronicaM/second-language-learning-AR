'use strict';

var express = require('express');
var controller = require('./translate.controller.js');
var router = express.Router();

router.post('/', controller.translateWord);

module.exports = router;
