'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuoteSchema = new Schema({
  title: String,
  quotes: []
});

module.exports = mongoose.model('Quote', QuoteSchema);