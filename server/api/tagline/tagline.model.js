'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaglineSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Tagline', TaglineSchema);