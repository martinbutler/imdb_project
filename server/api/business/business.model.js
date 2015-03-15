'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BusinessSchema = new Schema({
  title: String,
  PD: [],
  CP: [],
  SD: [],
  OW: [],
  BT: [],
  AD: [],
  GR: [],
  RT: [],
  WG: []
});

module.exports = mongoose.model('Business', BusinessSchema);