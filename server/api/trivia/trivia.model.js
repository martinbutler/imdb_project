'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TriviaSchema = new Schema({
  title: String,
  trivia: []
});

module.exports = mongoose.model('Trivia', TriviaSchema);