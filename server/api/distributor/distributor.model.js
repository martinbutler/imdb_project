'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DistributorSchema = new Schema({
  title: String,
  name: String,
  attributes: Boolean
});

module.exports = mongoose.model('Distributor', DistributorSchema);