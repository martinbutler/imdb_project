'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AkaTitleSchema = new Schema({
  name: String,
  title: String,
  attributes: String
});

module.exports = mongoose.model('AkaTitle', AkaTitleSchema);