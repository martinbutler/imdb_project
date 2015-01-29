'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ActressSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Actress', ActressSchema);