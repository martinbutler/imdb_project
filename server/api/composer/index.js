'use strict';

var express = require('express');
var controller = require('./composer.controller');

var router = express.Router();

router.get('/distinctComposers/:name', controller.distinctComposers);
router.get('/composersTitles/:name', controller.composerTitles);
router.get('/byTitle/:title', controller.composersByTitles);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
