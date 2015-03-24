'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CrazyCreditSchema = new Schema({
  title: String,
  credit: []
});

module.exports = mongoose.model('CrazyCredit', CrazyCreditSchema);