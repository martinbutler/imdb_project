'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItalianAkaTitleSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('ItalianAkaTitle', ItalianAkaTitleSchema);