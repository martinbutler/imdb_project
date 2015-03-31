'use strict';

var _ = require('lodash');
var Laserdisc = require('./laserdisc.model');

// Get list of laserdiscs
exports.index = function(req, res) {
  Laserdisc.find(function (err, laserdiscs) {
    if(err) { return handleError(res, err); }
    return res.json(200, laserdiscs);
  });
};

// Get a single laserdisc
exports.show = function(req, res) {
  Laserdisc.findById(req.params.id, function (err, laserdisc) {
    if(err) { return handleError(res, err); }
    if(!laserdisc) { return res.send(404); }
    return res.json(laserdisc);
  });
};

// Creates a new laserdisc in the DB.
exports.create = function(req, res) {
  Laserdisc.create(req.body, function(err, laserdisc) {
    if(err) { return handleError(res, err); }
    return res.json(201, laserdisc);
  });
};

// Updates an existing laserdisc in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Laserdisc.findById(req.params.id, function (err, laserdisc) {
    if (err) { return handleError(res, err); }
    if(!laserdisc) { return res.send(404); }
    var updated = _.merge(laserdisc, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, laserdisc);
    });
  });
};

// Deletes a laserdisc from the DB.
exports.destroy = function(req, res) {
  Laserdisc.findById(req.params.id, function (err, laserdisc) {
    if(err) { return handleError(res, err); }
    if(!laserdisc) { return res.send(404); }
    laserdisc.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}