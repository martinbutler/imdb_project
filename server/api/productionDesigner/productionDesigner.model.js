'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductionDesignerSchema = new Schema({
  name: String,
  title: String,
  misc: String
});

module.exports = mongoose.model('ProductionDesigner', ProductionDesignerSchema);