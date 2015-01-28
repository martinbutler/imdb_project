'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MpaaRatingsReasonSchema = new Schema({
  title: String,
  reason: String
});

module.exports = mongoose.model('MpaaRatingsReason', MpaaRatingsReasonSchema);
