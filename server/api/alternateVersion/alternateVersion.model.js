'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AlternateVersionSchema = new Schema({
  title: String,
  alternates: []
});

module.exports = mongoose.model('AlternateVersion', AlternateVersionSchema);