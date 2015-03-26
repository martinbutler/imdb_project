'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProducerSchema = new Schema({
  name: String,
  title: String,
  attributes: String
});

module.exports = mongoose.model('Producer', ProducerSchema);