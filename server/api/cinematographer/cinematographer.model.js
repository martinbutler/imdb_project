'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CinematographerSchema = new Schema({
  name: String,
  title: String,
  attribute: String
});

module.exports = mongoose.model('Cinematographer', CinematographerSchema);