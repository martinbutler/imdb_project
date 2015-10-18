'use strict';

var express = require('express');
var controller = require('./producer.controller');

var router = express.Router();

router.get('/distinctProducers/:name', controller.distinctProducers);
router.get('/producersTitles/:name', controller.producerTitles);
router.get('/byTitle/:title', controller.producerByTitles);
router.get('/byNameAndTitle/:title/:name', controller.combinedNameAndTitleSearch);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
