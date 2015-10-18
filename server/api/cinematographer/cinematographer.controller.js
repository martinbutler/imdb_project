'use strict';

var _ = require('lodash');
var Cinematographer = require('./cinematographer.model');



// Get distinct of values from name field
exports.distinctCinematographers = function(req, res) {
  var r = new RegExp(req.params.name, 'i');
  var start = Date.now();
  Cinematographer.aggregate([{$match: {name: {$regex:r}}},
                  {$group: {_id: '$name', titleSum:{$sum:1}}}],
                  function (err, CinematographerNames) {

    console.log('cinematographer count', CinematographerNames.length);
    var end =  Date.now();
    console.log('time', end - start);
    if(err) { return handleError(res, err); }
    return res.json(200, CinematographerNames);
  });
};

// Get title and roles of an cinematographers
exports.cinematographerTitles = function(req, res) {
  var start = Date.now();
  Cinematographer.find({
    name: req.params.name
  }, function(err, cinematographerRecords) {
    var end =  Date.now();
    console.log('time', end-start)
    if(err) { return handleError(res, err); }
    return res.json(200, cinematographerRecords);
  });
};

// cinematographersByTitles
exports.cinematographersByTitles = function(req, res) {
  var start = Date.now();
  Cinematographer.find({
    title: req.params.title
  }, function(err, cinematographerRecords) {
    var end =  Date.now();
    console.log('time', end-start)
    if(err) { return handleError(res, err); }
    return res.json(200, cinematographerRecords);
  });
};

// Get list of cinematographers and titles matching on partial title and partial title
exports.combinedNameAndTitleSearch = function(req, res) {
  var r1 = new RegExp(req.params.title, 'i');
  var r2 = new RegExp(req.params.name, 'i');
  var start = Date.now();
  Cinematographer.find({
      title: {$regex:r1},
      name: {$regex:r2}
  }, function (err, cinematographersAndTitles) {
    var end =  Date.now();
    console.log('time', end - start);
    if(err) { return handleError(res, err); }
    return res.json(200, cinematographersAndTitles);
  });
};


// Get list of cinematographers
exports.index = function(req, res) {
  Cinematographer.find(function (err, cinematographers) {
    if(err) { return handleError(res, err); }
    return res.json(200, cinematographers);
  });
};

// Get a single cinematographer
exports.show = function(req, res) {
  Cinematographer.findById(req.params.id, function (err, cinematographer) {
    if(err) { return handleError(res, err); }
    if(!cinematographer) { return res.send(404); }
    return res.json(cinematographer);
  });
};

// Creates a new cinematographer in the DB.
exports.create = function(req, res) {
  Cinematographer.create(req.body, function(err, cinematographer) {
    if(err) { return handleError(res, err); }
    return res.json(201, cinematographer);
  });
};

// Updates an existing cinematographer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Cinematographer.findById(req.params.id, function (err, cinematographer) {
    if (err) { return handleError(res, err); }
    if(!cinematographer) { return res.send(404); }
    var updated = _.merge(cinematographer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, cinematographer);
    });
  });
};

// Deletes a cinematographer from the DB.
exports.destroy = function(req, res) {
  Cinematographer.findById(req.params.id, function (err, cinematographer) {
    if(err) { return handleError(res, err); }
    if(!cinematographer) { return res.send(404); }
    cinematographer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
