/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/countries', require('./api/country'));
  app.use('/api/businesses', require('./api/business'));
  app.use('/api/keywords', require('./api/keyword'));
  app.use('/api/producers', require('./api/producer'));
  app.use('/api/ratings', require('./api/rating'));
  app.use('/api/directors', require('./api/director'));
  app.use('/api/actors', require('./api/actor'));
  app.use('/api/actresses', require('./api/actress'));
  app.use('/api/mpaaRatingsReasons', require('./api/mpaaRatingsReason'));
  app.use('/api/movies', require('./api/movie'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
