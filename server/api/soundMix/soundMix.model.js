'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SoundMixSchema = new Schema({
  title: String,
  mix: String,
  attributes: String
});

module.exports = mongoose.model('SoundMix', SoundMixSchema);