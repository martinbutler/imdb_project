'use strict';

var _ = require('lodash');
var ProductionDesigner = require('./productionDesigner.model');

// Get list of productionDesigners
exports.index = function(req, res) {
  ProductionDesigner.find(function (err, productionDesigners) {
    if(err) { return handleError(res, err); }
    return res.json(200, productionDesigners);
  });
};

// Get a single productionDesigner
exports.show = function(req, res) {
  ProductionDesigner.findById(req.params.id, function (err, productionDesigner) {
    if(err) { return handleError(res, err); }
    if(!productionDesigner) { return res.send(404); }
    return res.json(productionDesigner);
  });
};

// Creates a new productionDesigner in the DB.
exports.create = function(req, res) {
  ProductionDesigner.create(req.body, function(err, productionDesigner) {
    if(err) { return handleError(res, err); }
    return res.json(201, productionDesigner);
  });
};

// Updates an existing productionDesigner in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ProductionDesigner.findById(req.params.id, function (err, productionDesigner) {
    if (err) { return handleError(res, err); }
    if(!productionDesigner) { return res.send(404); }
    var updated = _.merge(productionDesigner, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, productionDesigner);
    });
  });
};

// Deletes a productionDesigner from the DB.
exports.destroy = function(req, res) {
  ProductionDesigner.findById(req.params.id, function (err, productionDesigner) {
    if(err) { return handleError(res, err); }
    if(!productionDesigner) { return res.send(404); }
    productionDesigner.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}