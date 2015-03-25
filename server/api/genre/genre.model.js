'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GenreSchema = new Schema({
  title: String,
  genre: String
});

module.exports = mongoose.model('Genre', GenreSchema);