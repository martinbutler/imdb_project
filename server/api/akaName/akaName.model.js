'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AkaNameSchema = new Schema({
  name: String,
  aka: String
});

module.exports = mongoose.model('AkaName', AkaNameSchema);