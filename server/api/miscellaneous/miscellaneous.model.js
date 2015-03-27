'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MiscellaneousSchema = new Schema({
  name: String,
  title: String,
  attributes: String
});

module.exports = mongoose.model('Miscellaneous', MiscellaneousSchema);