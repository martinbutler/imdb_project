'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ColorSchema = new Schema({
  title: String,
  color: String
});

module.exports = mongoose.model('Color', ColorSchema);