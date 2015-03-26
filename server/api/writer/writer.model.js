'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WriterSchema = new Schema({
  name: String,
  title: String,
  attributes: String
});

module.exports = mongoose.model('Writer', WriterSchema);