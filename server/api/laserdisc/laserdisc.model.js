'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LaserdiscSchema = new Schema({
  OT: [],
  LB: [],
  CN: [],
  LT: [],
  PC: [],
  CF: [],
  CA: [],
  GR: [],
  LA: [],
  SU: [],
  RD: [],
  ST: [],
  PR: [],
  VS: [],
  CO: [],
  SE: [],
  AL: [],
  AR: [],
  MF: [],
  SZ: [],
  SI: [],
  DF: [],
  CC: [],
  QP: [],
  YR: [],
  LE: [],
  RC: [],
  DS: [],
  PP: [],
  PF: [],
  AS: [],
  IN: [],
  CS: [],
  SL: [],
  RV: []
});

module.exports = mongoose.model('Laserdisc', LaserdiscSchema);