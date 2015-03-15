'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ActorSchema = new Schema({
  name: String,
  title: String,
  role: String,
  billing: String
});

module.exports = mongoose.model('Actor', ActorSchema);