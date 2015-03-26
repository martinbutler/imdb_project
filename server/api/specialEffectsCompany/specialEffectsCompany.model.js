'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SpecialEffectsCompanySchema = new Schema({
  title: String,
  name: String,
  attributes: String
});

module.exports = mongoose.model('SpecialEffectsCompany', SpecialEffectsCompanySchema);