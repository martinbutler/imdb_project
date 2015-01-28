'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MovieSchema = new Schema({
  title: String,
  year: String
});

module.exports = mongoose.model('Movie', MovieSchema);
