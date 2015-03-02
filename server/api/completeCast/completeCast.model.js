'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CompleteCastSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('CompleteCast', CompleteCastSchema);