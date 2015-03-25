'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocationSchema = new Schema({
  title: String,
  location: String,
  misc: String
});

module.exports = mongoose.model('Location', LocationSchema);