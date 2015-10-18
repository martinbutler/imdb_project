'use strict';

var _ = require('lodash');
var Writer = require('./writer.model');

// Get distinct of values from name field
exports.distinctWriters = function(req, res) {
  var r = new RegExp(req.params.name, 'i');
  var start = Date.now();
  Writer.aggregate([{$match: {name: {$regex:r}}},
                  {$group: {_id: '$name', titleSum:{$sum:1}}}],
                  function (err, writerNames) {

    console.log('writer count', writerNames.length);
    var end =  Date.now();
    console.log('time', end - start);
    if(err) { return handleError(res, err); }
    return res.json(200, writerNames);
  });
};

// Get title and roles of an writer
exports.writerTitles = function(req, res) {
  var start = Date.now();
  Writer.find({
    name: req.params.name
  }, function(err, writerRecords) {
    var end =  Date.now();
    console.log('time', end-start)
    if(err) { return handleError(res, err); }
    return res.json(200, writerRecords);
  });
};

// writersByTitles
exports.writersByTitles = function(req, res) {
  var start = Date.now();
  Writer.find({
    title: req.params.title
  }, function(err, writerRecords) {
    var end =  Date.now();
    console.log('time', end-start)
    if(err) { return handleError(res, err); }
    return res.json(200, writerRecords);
  });
};

// Get list of writers and titles matching on partial name and partial title
exports.combinedNameAndTitleSearch = function(req, res) {
  var r1 = new RegExp(req.params.title, 'i');
  var r2 = new RegExp(req.params.name, 'i');
  var start = Date.now();
  Writer.find({
      title: {$regex:r1},
      name: {$regex:r2}
  }, function (err, writersAndTitles) {
    var end =  Date.now();
    console.log('time', end - start);
    if(err) { return handleError(res, err); }
    return res.json(200, writersAndTitles);
  });
};



// Get list of writers
exports.index = function(req, res) {
  Writer.find(function (err, writers) {
    if(err) { return handleError(res, err); }
    return res.json(200, writers);
  });
};

// Get a single writer
exports.show = function(req, res) {
  Writer.findById(req.params.id, function (err, writer) {
    if(err) { return handleError(res, err); }
    if(!writer) { return res.send(404); }
    return res.json(writer);
  });
};

// Creates a new writer in the DB.
exports.create = function(req, res) {
  Writer.create(req.body, function(err, writer) {
    if(err) { return handleError(res, err); }
    return res.json(201, writer);
  });
};

// Updates an existing writer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Writer.findById(req.params.id, function (err, writer) {
    if (err) { return handleError(res, err); }
    if(!writer) { return res.send(404); }
    var updated = _.merge(writer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, writer);
    });
  });
};

// Deletes a writer from the DB.
exports.destroy = function(req, res) {
  Writer.findById(req.params.id, function (err, writer) {
    if(err) { return handleError(res, err); }
    if(!writer) { return res.send(404); }
    writer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
