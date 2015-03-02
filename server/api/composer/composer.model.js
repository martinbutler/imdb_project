'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ComposerSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Composer', ComposerSchema);