'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MovieLinkSchema = new Schema({
  title: String,
  links: []
});

module.exports = mongoose.model('MovieLink', MovieLinkSchema);