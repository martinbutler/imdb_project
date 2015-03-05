'use strict';

var _ = require('lodash');
var SoundMix = require('./soundMix.model');

// Get list of soundMixs
exports.index = function(req, res) {
  SoundMix.find(function (err, soundMixs) {
    if(err) { return handleError(res, err); }
    return res.json(200, soundMixs);
  });
};

// Get a single soundMix
exports.show = function(req, res) {
  SoundMix.findById(req.params.id, function (err, soundMix) {
    if(err) { return handleError(res, err); }
    if(!soundMix) { return res.send(404); }
    return res.json(soundMix);
  });
};

// Creates a new soundMix in the DB.
exports.create = function(req, res) {
  SoundMix.create(req.body, function(err, soundMix) {
    if(err) { return handleError(res, err); }
    return res.json(201, soundMix);
  });
};

// Updates an existing soundMix in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  SoundMix.findById(req.params.id, function (err, soundMix) {
    if (err) { return handleError(res, err); }
    if(!soundMix) { return res.send(404); }
    var updated = _.merge(soundMix, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, soundMix);
    });
  });
};

// Deletes a soundMix from the DB.
exports.destroy = function(req, res) {
  SoundMix.findById(req.params.id, function (err, soundMix) {
    if(err) { return handleError(res, err); }
    if(!soundMix) { return res.send(404); }
    soundMix.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}