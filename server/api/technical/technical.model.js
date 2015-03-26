'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TechnicalSchema = new Schema({
  title: String,
  data: String
});

module.exports = mongoose.model('Technical', TechnicalSchema);