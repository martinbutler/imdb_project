'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GoofSchema = new Schema({
  title: String,
  goofs: []
});

module.exports = mongoose.model('Goof', GoofSchema);