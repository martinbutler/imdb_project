'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SoundMixSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('SoundMix', SoundMixSchema);