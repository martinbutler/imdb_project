'use strict';

var express = require('express');
var controller = require('./costumeDesigner.controller');

var router = express.Router();

router.get('/distinctCostumeDesigners/:name', controller.distinctCostumeDesigners);
router.get('/costumeDesignersTitles/:name', controller.costumeDesignerTitles);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
