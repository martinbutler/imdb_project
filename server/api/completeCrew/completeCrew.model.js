'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CompleteCrewSchema = new Schema({
  title: String,
  complete: String
});

module.exports = mongoose.model('CompleteCrew', CompleteCrewSchema);