'use strict';

var express = require('express');
var controller = require('./actress.controller');

var router = express.Router();

router.get('/distinctActresses/:name', controller.distinctActresses);
router.get('/actressesTitles/:name', controller.actressTitles);
router.get('/byTitle/:title', controller.actressesByTitles);
router.get('/byNameAndTitle/:title/:name', controller.combinedNameAndTitleSearch);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
