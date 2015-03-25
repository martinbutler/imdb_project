'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IsoAkaTitleSchema = new Schema({
  title: String,
  aka: String
});

module.exports = mongoose.model('IsoAkaTitle', IsoAkaTitleSchema);