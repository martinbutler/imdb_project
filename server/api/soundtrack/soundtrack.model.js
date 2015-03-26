'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SoundtrackSchema = new Schema({
  title: String,
  song: String,
  attributes: []
});

module.exports = mongoose.model('Soundtrack', SoundtrackSchema);