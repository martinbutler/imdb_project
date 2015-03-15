'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ActressSchema = new Schema({
  name: String,
  title: String,
  role: String,
  billing: String
});

module.exports = mongoose.model('Actress', ActressSchema);