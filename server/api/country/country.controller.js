'use strict';

var _ = require('lodash');
var Country = require('./country.model');

// Get list of countrys
exports.index = function(req, res) {
  Country.find(function (err, countrys) {
    if(err) { return handleError(res, err); }
    return res.json(200, countrys);
  });
};

// Get a single country
exports.show = function(req, res) {
  Country.findById(req.params.id, function (err, country) {
    if(err) { return handleError(res, err); }
    if(!country) { return res.send(404); }
    return res.json(country);
  });
};

// Creates a new country in the DB.
exports.create = function(req, res) {
  Country.create(req.body, function(err, country) {
    if(err) { return handleError(res, err); }
    return res.json(201, country);
  });
};

// Updates an existing country in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Country.findById(req.params.id, function (err, country) {
    if (err) { return handleError(res, err); }
    if(!country) { return res.send(404); }
    var updated = _.merge(country, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, country);
    });
  });
};

// Deletes a country from the DB.
exports.destroy = function(req, res) {
  Country.findById(req.params.id, function (err, country) {
    if(err) { return handleError(res, err); }
    if(!country) { return res.send(404); }
    country.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}