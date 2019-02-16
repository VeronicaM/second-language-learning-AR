/**
 * GET     /api/word              ->  index
 * POST    /api/word              ->  create
 * GET     /api/word/:id          ->  show
 * PUT     /api/word/:id          ->  upsert
 * PATCH   /api/word/:id          ->  patch
 * DELETE  /api/word/:id          ->  destroy
 */

'use strict';

const Word = require('./word.model');
var translateController = require('../translate/translate.controller.js');

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}


function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.remove()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

function addTranslations(words, {interfaceLang, courseLang}) {
    const result = words && words.map((word) => {
        const result = translateController.translateWord({text: word.text, interfaceLang, courseLang});
        return result;
    });

    return Promise.all(result).then((translateWords) => {
        return translateWords;
    });
}

// Gets a list of Things
exports.index = function(req, res) {
    return Word.find({})
        .exec()
        .then((words) => addTranslations(words, {
            interfaceLang: req.query.interfaceLang,
            courseLang: req.query.courseLang
        }))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Word from the DB
exports.show = function(req, res) {
    return Word.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Word in the DB
exports.create = function(req, res) {
    var WordBody = {
        "text": req.body.text
    };
    Word.create(WordBody)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Creates a new Word in the DB
exports.addWord = function(text) {
    var WordBody = {
        "text": text
    };
    Word.create(WordBody)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Deletes a Word from the DB
exports.destroy = function(req, res) {
    return Word.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
