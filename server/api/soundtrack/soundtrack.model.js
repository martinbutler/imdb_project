'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SoundtrackSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Soundtrack', SoundtrackSchema);