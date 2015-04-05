'use strict';

var _ = require('lodash');
var Actor = require('./actor.model');

// Get list of actors
exports.index = function(req, res) {
  console.log('get actors - index');
  Actor.find(function (err, actors) {
    console.log('actors', actors);
    if(err) { return handleError(res, err); }
    return res.json(200, actors);
  });
};

// Get a single actor
exports.show = function(req, res) {
  Actor.findById(req.params.id, function (err, actor) {
    if(err) { return handleError(res, err); }
    if(!actor) { return res.send(404); }
    return res.json(actor);
  });
};

// Creates a new actor in the DB.
exports.create = function(req, res) {
  Actor.create(req.body, function(err, actor) {
    if(err) { return handleError(res, err); }
    return res.json(201, actor);
  });
};

// Updates an existing actor in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Actor.findById(req.params.id, function (err, actor) {
    if (err) { return handleError(res, err); }
    if(!actor) { return res.send(404); }
    var updated = _.merge(actor, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, actor);
    });
  });
};

// Deletes a actor from the DB.
exports.destroy = function(req, res) {
  Actor.findById(req.params.id, function (err, actor) {
    if(err) { return handleError(res, err); }
    if(!actor) { return res.send(404); }
    actor.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Get distinct of values from name field
exports.distinctActors = function(req, res) {
  var r = new RegExp("rob", 'i');
  var start = Date.now();
  Actor.aggregate([{$match: {name: {$regex:r}}},
                  {$group: {_id: '$name', titleSum:{$sum:1}}}],
                  function (err, actorNames) {

    console.log('count', actorNames.length);
    var end =  Date.now();
    console.log('time', end - start);
    if(err) { return handleError(res, err); }
    return res.json(200, actorNames);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
