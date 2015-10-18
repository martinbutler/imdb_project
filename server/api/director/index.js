'use strict';

var express = require('express');
var controller = require('./director.controller');

var router = express.Router();

router.get('/distinctDirectors/:name', controller.distinctDirectors);
router.get('/directorsTitles/:name', controller.directorTitles);
router.get('/byTitle/:title', controller.directorByTitles);
router.get('/byNameAndTitle/:title/:name', controller.combinedNameAndTitleSearch);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
