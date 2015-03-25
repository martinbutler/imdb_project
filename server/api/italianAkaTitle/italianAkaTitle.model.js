'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItalianAkaTitleSchema = new Schema({
  title: String,
  aka: String,
  attributes: String
});

module.exports = mongoose.model('ItalianAkaTitle', ItalianAkaTitleSchema);