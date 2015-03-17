'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CompleteCastSchema = new Schema({
  title: String,
  complete: String
});

module.exports = mongoose.model('CompleteCast', CompleteCastSchema);