'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlotSchema = new Schema({
  title: String,
  plots: []
});

module.exports = mongoose.model('Plot', PlotSchema);