'use strict';

var express = require('express');
var controller = require('./translate.controller.js');
var router = express.Router();

router.get('/', controller.translate);

module.exports = router;
