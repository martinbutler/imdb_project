'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RunningTimeSchema = new Schema({
  title: String,
  runTime: String,
  misc: String
});

module.exports = mongoose.model('RunningTime', RunningTimeSchema);