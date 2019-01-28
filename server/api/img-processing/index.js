'use strict';
var multer = require('multer');
var maxsize = 3 * 1000 * 1000;
var storage = multer.diskStorage({
	destination:function(req, file, callback){
		callback(null, './uploads');
	},
	filename:function(req, file, callback){
		callback(null, req.user.id);
	}
});
var upload = multer({storage: storage, limits:{fileSize:maxsize}, dest: './uploads'});

var express = require('express');
var controller = require('./img-processing.controller.js');
var router = express.Router();

router.post('/', upload.single('img'), controller.analyse);

module.exports = router;