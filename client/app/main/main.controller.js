'use strict';

angular.module('imdbProjectApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    var actors = [];
    $http.get('/api/actors/distinctActors/').success(function(a) {
      actors = a;
      console.log('a', a);
    });


    var oneRecord = [];
    $http.get('/api/actors/551db8d7edd2d608c80a14fd').success(function(a) {
      oneRecord = a;
      console.log('oneRecord', a);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
