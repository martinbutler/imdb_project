'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AkaTitleSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('AkaTitle', AkaTitleSchema);