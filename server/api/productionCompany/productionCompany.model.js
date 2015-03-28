'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductionCompanySchema = new Schema({
  title: String,
  name: String,
  attributes: String
});

module.exports = mongoose.model('ProductionCompany', ProductionCompanySchema);