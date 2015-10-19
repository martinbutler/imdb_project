'use strict';

var express = require('express');
var controller = require('./actor.controller');

var router = express.Router();

router.get('/distinctActors/:name', controller.distinctActors);
router.get('/sixdegrees/:other/:bacon', controller.sixdegrees);
router.get('/actorsTitles/:name', controller.actorTitles);
router.get('/byTitle/:title', controller.actorsByTitles);
router.get('/byNameAndTitle/:title/:name', controller.combinedNameAndTitleSearch);
router.get('/titlesNoSelf/:name', controller.titlesNoSelf);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
