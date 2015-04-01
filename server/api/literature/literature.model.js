'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LiteratureSchema = new Schema({
  title: String,
  MOVI: [],
  BOOK: [],
  NOVL: [],
  ADPT: [],
  ESSY: [],
  CRIT: [],
  OTHR: [],
  PROT: [],
  SCRP: [],
  IVIW: []
});

module.exports = mongoose.model('Literature', LiteratureSchema);