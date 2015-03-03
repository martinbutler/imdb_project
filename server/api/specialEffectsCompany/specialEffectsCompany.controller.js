'use strict';

var _ = require('lodash');
var SpecialEffectsCompany = require('./specialEffectsCompany.model');

// Get list of specialEffectsCompanys
exports.index = function(req, res) {
  SpecialEffectsCompany.find(function (err, specialEffectsCompanys) {
    if(err) { return handleError(res, err); }
    return res.json(200, specialEffectsCompanys);
  });
};

// Get a single specialEffectsCompany
exports.show = function(req, res) {
  SpecialEffectsCompany.findById(req.params.id, function (err, specialEffectsCompany) {
    if(err) { return handleError(res, err); }
    if(!specialEffectsCompany) { return res.send(404); }
    return res.json(specialEffectsCompany);
  });
};

// Creates a new specialEffectsCompany in the DB.
exports.create = function(req, res) {
  SpecialEffectsCompany.create(req.body, function(err, specialEffectsCompany) {
    if(err) { return handleError(res, err); }
    return res.json(201, specialEffectsCompany);
  });
};

// Updates an existing specialEffectsCompany in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  SpecialEffectsCompany.findById(req.params.id, function (err, specialEffectsCompany) {
    if (err) { return handleError(res, err); }
    if(!specialEffectsCompany) { return res.send(404); }
    var updated = _.merge(specialEffectsCompany, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, specialEffectsCompany);
    });
  });
};

// Deletes a specialEffectsCompany from the DB.
exports.destroy = function(req, res) {
  SpecialEffectsCompany.findById(req.params.id, function (err, specialEffectsCompany) {
    if(err) { return handleError(res, err); }
    if(!specialEffectsCompany) { return res.send(404); }
    specialEffectsCompany.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}