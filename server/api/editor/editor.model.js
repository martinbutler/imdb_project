'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EditorSchema = new Schema({
  name: String,
  title: String,
  attribute: String
});

module.exports = mongoose.model('Editor', EditorSchema);