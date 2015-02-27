'use strict';

var _ = require('lodash');
var Language = require('./language.model');

// Get list of languages
exports.index = function(req, res) {
  Language.find(function (err, languages) {
    if(err) { return handleError(res, err); }
    return res.json(200, languages);
  });
};

// Get a single language
exports.show = function(req, res) {
  Language.findById(req.params.id, function (err, language) {
    if(err) { return handleError(res, err); }
    if(!language) { return res.send(404); }
    return res.json(language);
  });
};

// Creates a new language in the DB.
exports.create = function(req, res) {
  Language.create(req.body, function(err, language) {
    if(err) { return handleError(res, err); }
    return res.json(201, language);
  });
};

// Updates an existing language in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Language.findById(req.params.id, function (err, language) {
    if (err) { return handleError(res, err); }
    if(!language) { return res.send(404); }
    var updated = _.merge(language, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, language);
    });
  });
};

// Deletes a language from the DB.
exports.destroy = function(req, res) {
  Language.findById(req.params.id, function (err, language) {
    if(err) { return handleError(res, err); }
    if(!language) { return res.send(404); }
    language.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}