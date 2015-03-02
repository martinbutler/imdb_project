'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DistributorSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Distributor', DistributorSchema);