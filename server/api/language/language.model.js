'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LanguageSchema = new Schema({
  title: String,
  language: String,
  misc: String
});

module.exports = mongoose.model('Language', LanguageSchema);