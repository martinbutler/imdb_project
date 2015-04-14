'use strict';

angular.module('imdbProjectApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    var actorCombined = [];

    $scope.searchActors = function() {
      actorCombined = [];
      $http.get('/api/actors/distinctActors/' + $scope.actorSearch).success(function(a) {
        actorCombine(a);
      });
      $http.get('/api/actresses/distinctActresses/' + $scope.actorSearch).success(function(a) {
        actorCombine(a);
      });
    };

    var actorCombine = function(a) {
      actorCombined = actorCombined.concat(a);
      console.log(actorCombined, 'actorCombined');
    };

    // test backend on page load
    $http.get('/api/actors/551db908edd2d608c83aeeac').success(function(a) {
      console.log('oneRecord', a);
    });

  });
