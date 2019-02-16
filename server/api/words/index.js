'use strict';

var express = require('express');
var controller = require('./words.controller.js');
var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);

module.exports = router;
