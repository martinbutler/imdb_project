'use strict';

var _ = require('lodash');
var CostumeDesigner = require('./costumeDesigner.model');




// Get distinct of values from name field
exports.distinctCostumeDesigners = function(req, res) {
  var r = new RegExp(req.params.name, 'i');
  var start = Date.now();
  CostumeDesigner.aggregate([{$match: {name: {$regex:r}}},
                  {$group: {_id: '$name', titleSum:{$sum:1}}}],
                  function (err, costumeDesignerNames) {

    console.log('costumeDesigner count', costumeDesignerNames.length);
    var end =  Date.now();
    console.log('time', end - start);
    if(err) { return handleError(res, err); }
    return res.json(200, costumeDesignerNames);
  });
};

// Get title and roles of an actress
exports.costumeDesignerTitles = function(req, res) {
  var start = Date.now();
  CostumeDesigner.find({
    name: req.params.name
  }, function(err, costumeDesignersRecords) {
    var end =  Date.now();
    console.log('time', end-start)
    if(err) { return handleError(res, err); }
    return res.json(200, costumeDesignersRecords);
  });
};

// costumeDesignersByTitles
exports.costumeDesignersByTitles = function(req, res) {
  var start = Date.now();
  CostumeDesigner.find({
    title: req.params.title
  }, function(err, costumeDesignersRecords) {
    var end =  Date.now();
    console.log('time', end-start)
    if(err) { return handleError(res, err); }
    return res.json(200, costumeDesignersRecords);
  });
};

// Get list of costumeDesigners and titles matching on partial name and partial title
exports.combinedNameAndTitleSearch = function(req, res) {
  var r1 = new RegExp(req.params.title, 'i');
  var r2 = new RegExp(req.params.name, 'i');
  var start = Date.now();
  CostumeDesigner.find({
      title: {$regex:r1},
      name: {$regex:r2}
  }, function (err, costumeDesignersAndTitles) {
    var end =  Date.now();
    console.log('time', end - start);
    if(err) { return handleError(res, err); }
    return res.json(200, costumeDesignersAndTitles);
  });
};



// Get list of costumeDesigners
exports.index = function(req, res) {
  CostumeDesigner.find(function (err, costumeDesigners) {
    if(err) { return handleError(res, err); }
    return res.json(200, costumeDesigners);
  });
};

// Get a single costumeDesigner
exports.show = function(req, res) {
  CostumeDesigner.findById(req.params.id, function (err, costumeDesigner) {
    if(err) { return handleError(res, err); }
    if(!costumeDesigner) { return res.send(404); }
    return res.json(costumeDesigner);
  });
};

// Creates a new costumeDesigner in the DB.
exports.create = function(req, res) {
  CostumeDesigner.create(req.body, function(err, costumeDesigner) {
    if(err) { return handleError(res, err); }
    return res.json(201, costumeDesigner);
  });
};

// Updates an existing costumeDesigner in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  CostumeDesigner.findById(req.params.id, function (err, costumeDesigner) {
    if (err) { return handleError(res, err); }
    if(!costumeDesigner) { return res.send(404); }
    var updated = _.merge(costumeDesigner, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, costumeDesigner);
    });
  });
};

// Deletes a costumeDesigner from the DB.
exports.destroy = function(req, res) {
  CostumeDesigner.findById(req.params.id, function (err, costumeDesigner) {
    if(err) { return handleError(res, err); }
    if(!costumeDesigner) { return res.send(404); }
    costumeDesigner.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
