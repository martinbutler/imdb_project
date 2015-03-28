'use strict';

var _ = require('lodash');
var ProductionCompany = require('./productionCompany.model');

// Get list of productionCompanys
exports.index = function(req, res) {
  ProductionCompany.find(function (err, productionCompanys) {
    if(err) { return handleError(res, err); }
    return res.json(200, productionCompanys);
  });
};

// Get a single productionCompany
exports.show = function(req, res) {
  ProductionCompany.findById(req.params.id, function (err, productionCompany) {
    if(err) { return handleError(res, err); }
    if(!productionCompany) { return res.send(404); }
    return res.json(productionCompany);
  });
};

// Creates a new productionCompany in the DB.
exports.create = function(req, res) {
  ProductionCompany.create(req.body, function(err, productionCompany) {
    if(err) { return handleError(res, err); }
    return res.json(201, productionCompany);
  });
};

// Updates an existing productionCompany in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ProductionCompany.findById(req.params.id, function (err, productionCompany) {
    if (err) { return handleError(res, err); }
    if(!productionCompany) { return res.send(404); }
    var updated = _.merge(productionCompany, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, productionCompany);
    });
  });
};

// Deletes a productionCompany from the DB.
exports.destroy = function(req, res) {
  ProductionCompany.findById(req.params.id, function (err, productionCompany) {
    if(err) { return handleError(res, err); }
    if(!productionCompany) { return res.send(404); }
    productionCompany.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}