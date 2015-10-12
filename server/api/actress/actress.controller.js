'use strict';

var _ = require('lodash');
var Actress = require('./actress.model');

// Get list of actresss
exports.index = function(req, res) {
  Actress.find(function (err, actresss) {
    if(err) { return handleError(res, err); }
    return res.json(200, actresss);
  });
};

// Get a single actress
exports.show = function(req, res) {
  Actress.findById(req.params.id, function (err, actress) {
    if(err) { return handleError(res, err); }
    if(!actress) { return res.send(404); }
    return res.json(actress);
  });
};

// Creates a new actress in the DB.
exports.create = function(req, res) {
  Actress.create(req.body, function(err, actress) {
    if(err) { return handleError(res, err); }
    return res.json(201, actress);
  });
};

// Updates an existing actress in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Actress.findById(req.params.id, function (err, actress) {
    if (err) { return handleError(res, err); }
    if(!actress) { return res.send(404); }
    var updated = _.merge(actress, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, actress);
    });
  });
};

// Deletes a actress from the DB.
exports.destroy = function(req, res) {
  Actress.findById(req.params.id, function (err, actress) {
    if(err) { return handleError(res, err); }
    if(!actress) { return res.send(404); }
    actress.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Get distinct of values from name field
exports.distinctActresses = function(req, res) {
  var r = new RegExp(req.params.name, 'i');
  var start = Date.now();
  Actress.aggregate([{$match: {name: {$regex:r}}},
                  {$group: {_id: '$name', titleSum:{$sum:1}}}],
                  function (err, actorNames) {

    console.log('Actress count', actorNames.length);
    var end =  Date.now();
    console.log('time', end - start);
    if(err) { return handleError(res, err); }
    return res.json(200, actorNames);
  });
};

// Get title and roles of an actress
exports.actressTitles = function(req, res) {
  var start = Date.now();
  Actress.find({
    name: req.params.name
  }, function(err, actressRecords) {
    var end =  Date.now();
    console.log('time', end-start)
    if(err) { return handleError(res, err); }
    return res.json(200, actressRecords);
  });
};

// actorsByTitles
exports.actressesByTitles = function(req, res) {
  var start = Date.now();
  Actress.find({
    title: req.params.title
  }, function(err, actressRecords) {
    var end =  Date.now();
    console.log('time', end-start)
    if(err) { return handleError(res, err); }
    return res.json(200, actressRecords);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
