'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CostumeDesignerSchema = new Schema({
  name: String,
  title: String,
  attribute: String
});

module.exports = mongoose.model('CostumeDesigner', CostumeDesignerSchema);