'use strict';

var express = require('express');
var controller = require('./img-processing.controller.js');
var router = express.Router();

router.post('/', controller.analyse);

module.exports = router;