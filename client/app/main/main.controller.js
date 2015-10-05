'use strict';

angular.module('imdbProjectApp')
  .controller('MainCtrl', function ($scope, $http, socket, ngTableParams, $filter) {
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
    var data = [];  // init search results array
    var actorCombine = function(a) {
      actorCombined = actorCombined.concat(a);
      console.log(actorCombined, 'actorCombined');
      data = aactorCombined;
        $scope.tableParams.reload();
        $scope.tableParams.total(data.length);
    };

     // table object, includes sorting and pagination
    $scope.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 10,          // count per page
      sorting: {}         // set a default sort
    }, {
      total: data.length, // length of data
      getData: function($defer, params) {
        // use build-in angular filter
        var orderedData = params.sorting() ?
                            $filter('orderBy')(data, params.orderBy()) :
                            data;

        var pageData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
        $defer.resolve(pageData);
        // bar chart data
        $scope.set = {
          x: [ ],
          y: [ ]
        };
        for(var i=0; i<pageData.length; i++) {
          $scope.set.x.push(pageData[i].name);
          $scope.set.y.push(pageData[i].txEnd - pageData[i].txStart);
        }
      }

    });

    // // test backend on page load
    // $http.get('/api/actors/551db908edd2d608c83aeeac').success(function(a) {
    //   console.log('oneRecord', a);
    // });

    // // sixdegrees
    // // var other = "Bonneville, Hugh";
    // var other = "De Niro, Robert",
    //     bacon = "Bacon, Kevin (I)";
    // $http.get('/api/actors/sixdegrees/' + other + "/" + bacon + '/').success(function(a) {
    //   console.log('bacon', a);
    // });

  });
