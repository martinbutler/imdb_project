'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TriviaSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Trivia', TriviaSchema);