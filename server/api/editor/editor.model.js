'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EditorSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Editor', EditorSchema);