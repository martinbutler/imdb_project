'use strict';

var express = require('express');
var controller = require('./cinematographer.controller');

var router = express.Router();

router.get('/distinctCinematographers/:name', controller.distinctCinematographers);
router.get('/cinematographersTitles/:name', controller.cinematographerTitles);
router.get('/byTitle/:title', controller.cinematographersByTitles);
router.get('/byNameAndTitle/:title/:name', controller.combinedNameAndTitleSearch);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
