'use strict';

var express = require('express');
var controller = require('./movie.controller');

var router = express.Router();
router.get('/distinctMovies/:name', controller.distinctMovies);
router.get('/moviesTitles/:name', controller.movieTitles);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
