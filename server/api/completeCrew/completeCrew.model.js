'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CompleteCrewSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('CompleteCrew', CompleteCrewSchema);