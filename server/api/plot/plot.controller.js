'use strict';

var _ = require('lodash');
var Plot = require('./plot.model');

// Get list of plots
exports.index = function(req, res) {
  Plot.find(function (err, plots) {
    if(err) { return handleError(res, err); }
    return res.json(200, plots);
  });
};

// Get a single plot
exports.show = function(req, res) {
  Plot.findById(req.params.id, function (err, plot) {
    if(err) { return handleError(res, err); }
    if(!plot) { return res.send(404); }
    return res.json(plot);
  });
};

// Creates a new plot in the DB.
exports.create = function(req, res) {
  Plot.create(req.body, function(err, plot) {
    if(err) { return handleError(res, err); }
    return res.json(201, plot);
  });
};

// Updates an existing plot in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Plot.findById(req.params.id, function (err, plot) {
    if (err) { return handleError(res, err); }
    if(!plot) { return res.send(404); }
    var updated = _.merge(plot, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, plot);
    });
  });
};

// Deletes a plot from the DB.
exports.destroy = function(req, res) {
  Plot.findById(req.params.id, function (err, plot) {
    if(err) { return handleError(res, err); }
    if(!plot) { return res.send(404); }
    plot.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}