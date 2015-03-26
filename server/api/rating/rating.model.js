'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RatingSchema = new Schema({
  title: String,
  newMovie: String,
  distribution: String,
  votes: Number,
  rank: Number
});

module.exports = mongoose.model('Rating', RatingSchema);