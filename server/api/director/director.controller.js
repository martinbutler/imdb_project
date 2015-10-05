'use strict';

var _ = require('lodash');
var Director = require('./director.model');


// Get distinct of values from name field
exports.distinctDirectors = function(req, res) {
  var r = new RegExp(req.params.name, 'i');
  var start = Date.now();
  Director.aggregate([{$match: {name: {$regex:r}}},
                  {$group: {_id: '$name', titleSum:{$sum:1}}}],
                  function (err, directorNames) {

    console.log('director count', directorNames.length);
    var end =  Date.now();
    console.log('time', end - start);
    if(err) { return handleError(res, err); }
    return res.json(200, directorNames);
  });
};




// Get list of directors
exports.index = function(req, res) {
  Director.find(function (err, directors) {
    if(err) { return handleError(res, err); }
    return res.json(200, directors);
  });
};

// Get a single director
exports.show = function(req, res) {
  Director.findById(req.params.id, function (err, director) {
    if(err) { return handleError(res, err); }
    if(!director) { return res.send(404); }
    return res.json(director);
  });
};

// Creates a new director in the DB.
exports.create = function(req, res) {
  Director.create(req.body, function(err, director) {
    if(err) { return handleError(res, err); }
    return res.json(201, director);
  });
};

// Updates an existing director in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Director.findById(req.params.id, function (err, director) {
    if (err) { return handleError(res, err); }
    if(!director) { return res.send(404); }
    var updated = _.merge(director, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, director);
    });
  });
};

// Deletes a director from the DB.
exports.destroy = function(req, res) {
  Director.findById(req.params.id, function (err, director) {
    if(err) { return handleError(res, err); }
    if(!director) { return res.send(404); }
    director.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
