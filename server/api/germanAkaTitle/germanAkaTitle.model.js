'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GermanAkaTitleSchema = new Schema({
  title: String,
  aka: String,
  attributes: String
});

module.exports = mongoose.model('GermanAkaTitle', GermanAkaTitleSchema);