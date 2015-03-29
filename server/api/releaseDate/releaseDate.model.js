'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReleaseDateSchema = new Schema({
  title: String,
  release: String,
  attributes: String
});

module.exports = mongoose.model('ReleaseDate', ReleaseDateSchema);