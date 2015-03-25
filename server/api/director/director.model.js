'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DirectorSchema = new Schema({
  name: String,
  title: String,
  additionalInfo: String
});

module.exports = mongoose.model('Director', DirectorSchema);