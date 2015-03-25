'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var KeywordSchema = new Schema({
  title: String,
  keyword: String
});

module.exports = mongoose.model('Keyword', KeywordSchema);