'use strict';

var _ = require('lodash');
var Actor = require('./actor.model');
var async = require('async');
var _ = require('lodash');

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
  var r = new RegExp(req.params.name, 'i');
  var start = Date.now();
  Actor.aggregate([{$match: {name: {$regex:r}}},
                  {$group: {_id: '$name', titleSum:{$sum:1}}}],
                  function (err, actorNames) {

    console.log('actor count', actorNames.length);
    var end =  Date.now();
    console.log('time', end - start);
    if(err) { return handleError(res, err); }
    return res.json(200, actorNames);
  });
};

// Get title and roles of an actor
exports.actorTitles = function(req, res) {
  var start = Date.now();
  Actor.find({
    name: req.params.name
  }, function(err, actorRecords) {
    var end =  Date.now();
    console.log('time', end-start)
    if(err) { return handleError(res, err); }
    return res.json(200, actorRecords);
  });
};

// Get title and roles of an actor
exports.titlesNoSelf = function(req, res) {
  var start = Date.now();
  Actor.find({
    name: req.params.name
  }, function(err, actorRecords) {
    var end =  Date.now();
    console.log('time', end-start)
    if(err) { return handleError(res, err); }
    var actorNoSelf = _.remove(actorRecords, function(record) {
      if (record['role'] && record['role'].indexOf('Himself') < 0 ) {
        return record;
      }
    })
    var actorTitlesOnly = [];
    actorNoSelf.forEach(function(obj) {
      actorTitlesOnly.push(obj.title)
    })
    return res.json(200, actorTitlesOnly);
  });
};

// actorsByTitles
exports.actorsByTitles = function(req, res) {
  var start = Date.now();
  Actor.find({
    title: req.params.title
  }, function(err, actorRecords) {
    var end =  Date.now();
    console.log('time', end-start)
    if(err) { return handleError(res, err); }
    return res.json(200, actorRecords);
  });
};

// Get list of actors and titles matching on partial name and partial title
exports.combinedNameAndTitleSearch = function(req, res) {
  var r1 = new RegExp(req.params.title, 'i');
  var r2 = new RegExp(req.params.name, 'i');
  var start = Date.now();
  Actor.find({
      title: {$regex:r1},
      name: {$regex:r2}
  }, function (err, actorsAndTitles) {
    var end =  Date.now();
    console.log('time', end - start);
    if(err) { return handleError(res, err); }
    return res.json(200, actorsAndTitles);
  });
};


// 6 degrees
exports.sixdegrees = function(req, res) {
  var degree = 1, maxDegree = 6;
  var degreeTitles = {};
  // if (!req.params.bacon) {
  //   req.params.bacon = "Bacon, Kevin (I)";
  // }
  // if (!req.params.other) {
  //   req.params.other = "Bonneville, Hugh";
  // }
  Actor.find({name: req.params.other}, {title: 1, _id: 0}, function(err, titles) {
    degreeTitles[degree] = titles;
    var matchFound = false;
    // _.forEach(titles, function(n, key) {
    //   Actor.find({title: n.title}, {name: 1, _id: 0}, function(err, names) {
    //     var match = _.findIndex(names, function(name) {
    //       console.log('name.name', name.name);
    //       return name.name === req.params.bacon;
    //     });
    //     if(match >=0) {
    //       console.log('found *******************', match)
    //       matchFound = true;
    //     }
    //   });
    //   console.log('matchFound', matchFound);
    //   return !matchFound;
    // });

    _.forEach(titles, function(n, key) {
      // Actor.find({title: n.title}, {name: 1, _id: 0}, function(err, names) {
      //   var match = _.findIndex(names, function(name) {
      //     console.log('name.name', name.name);
      //     return name.name === req.params.bacon;
      //   });
      //   if(match >=0) {
      //     console.log('found *******************', match)
      //     matchFound = true;
      //   }
      // });
      // return !matchFound;
      console.log('n',n);
      return !findBacon(n, req.params.bacon);
    });

    function findBacon(n, bacon) {
      Actor.find({title: n.title}, {name: 1, _id: 0}, function(err, names) {
        var match = _.findIndex(names, function(name) {
          // console.log('name.name', name.name);
          return name.name === bacon;
        });
        if(match >=0) {
          console.log('found *******************', match)
          matchFound = true;
        }
        console.log(matchFound);
        return matchFound;
      });
    }
    // titles.every(function(n) {
    //   Actor.find({title: n.title}, {name: 1, _id: 0}, function(err, names) {
    //     var match = _.findIndex(names, function(name) {
    //       console.log(n.title);
    //       console.log('name.name', name.name);
    //       return name.name === req.params.bacon;
    //     });
    //     if(match >=0) {
    //       console.log('found *******************', match)
    //       return false;
    //     } else {
    //       console.log('not found')

    //     }
    //     return n;
    //   });

    // })
    // async.each(titles, function(title, callback) {
    //   Actor.find({title: title.title}, {name: 1, _id: 0}, function(err, names) {
    //     console.log('find', title);
    //     // console.log('names', names);
    //     console.log('bacon', req.params.bacon);
    //     if(names.indexOf(req.params.bacon) >=0) {
    //       console.log('found: ' + names[names.indexOf(req.params.bacon)] + "   title: " + title);
    //     }
    //   });
    // });
    // for(var i = 0, len = titles.length; i < len; i++) {
    //   console.log('i', i);
    //   console.log('titles[i]', titles[i]);
    //   Actor.find({title: titles[i]}, {name: 1, _id:0}, function(err, titles) {
    //     console.log('i find', i);
    //     console.log('titles', titles);
    //     if(titles.indexOf(req.params.bacon) >=0) {
    //       console.log(titles[titles.indexOf(req.params.bacon)]);
    //       i = len;
    //     }
    //   });
    // }
    // titles.forEach(function(title) {
    //   console.log('title****************', title);
    //   Actor.find({title: title}, {name: 1, _id:0}, function(err, titles) {
    //     console.log('forEach', titles);
    //     if(titles.indexOf(req.params.bacon) >=0) {
    //       console.log(titles[titles.indexOf(req.params.bacon)]);
    //     }
    //   });
    // });
    // console.log(degreeTitles);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
