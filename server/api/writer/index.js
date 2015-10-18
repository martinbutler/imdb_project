'use strict';

var express = require('express');
var controller = require('./writer.controller');

var router = express.Router();

router.get('/distinctWriters/:name', controller.distinctWriters);
router.get('/writersTitles/:name', controller.writerTitles);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
