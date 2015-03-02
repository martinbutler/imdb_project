'use strict';

var _ = require('lodash');
var Editor = require('./editor.model');

// Get list of editors
exports.index = function(req, res) {
  Editor.find(function (err, editors) {
    if(err) { return handleError(res, err); }
    return res.json(200, editors);
  });
};

// Get a single editor
exports.show = function(req, res) {
  Editor.findById(req.params.id, function (err, editor) {
    if(err) { return handleError(res, err); }
    if(!editor) { return res.send(404); }
    return res.json(editor);
  });
};

// Creates a new editor in the DB.
exports.create = function(req, res) {
  Editor.create(req.body, function(err, editor) {
    if(err) { return handleError(res, err); }
    return res.json(201, editor);
  });
};

// Updates an existing editor in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Editor.findById(req.params.id, function (err, editor) {
    if (err) { return handleError(res, err); }
    if(!editor) { return res.send(404); }
    var updated = _.merge(editor, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, editor);
    });
  });
};

// Deletes a editor from the DB.
exports.destroy = function(req, res) {
  Editor.findById(req.params.id, function (err, editor) {
    if(err) { return handleError(res, err); }
    if(!editor) { return res.send(404); }
    editor.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}