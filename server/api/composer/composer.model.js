'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ComposerSchema = new Schema({
  name: String,
  title: String,
  attribute: String
});

module.exports = mongoose.model('Composer', ComposerSchema);