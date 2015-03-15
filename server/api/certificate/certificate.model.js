'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CertificateSchema = new Schema({
  title: String,
  certificate: String
});

module.exports = mongoose.model('Certificate', CertificateSchema);