'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaglineSchema = new Schema({
  title: String,
  tagline: String
});

module.exports = mongoose.model('Tagline', TaglineSchema);