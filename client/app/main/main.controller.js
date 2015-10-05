'use strict';

angular.module('imdbProjectApp')
  .controller('MainCtrl', function ($scope, $http, socket, ngTableParams, $filter) {
    var searchResultsCombined = [];

    $scope.searchActors = function() {
      searchResultsCombined = [];
      $http.get('/api/actors/distinctActors/' + $scope.nameSearch).success(function(a) {
        searchResultCombine(a, 'Actor/Actress');
      });
      $http.get('/api/actresses/distinctActresses/' + $scope.nameSearch).success(function(a) {
        searchResultCombine(a, 'Actor/Actress');
      });
      $http.get('/api/directors/distinctDirectors/' + $scope.nameSearch).success(function(a) {
        searchResultCombine(a, 'Directors');
      });
      $http.get('/api/producers/distinctProducers/' + $scope.nameSearch).success(function(a) {
        searchResultCombine(a, 'Producers');
      });
    };
    var data = [];  // init search results array
    var searchResultCombine = function(a, t) {
      var reformattedArray = a.map(function(obj){
         obj['table'] = t;

         return obj;
      });
      searchResultsCombined = searchResultsCombined.concat(a.map(function(obj){
         obj['table'] = t;

         return obj;
      }));
      console.log(searchResultsCombined, 'searchResultsCombined', t);
      data = searchResultsCombined;
        $scope.tableParams.reload();
        $scope.tableParams.total(data.length);
    };

     // table object, includes sorting and pagination
    $scope.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 10,          // count per page
      sorting: {"_id": 'asc'}         // set a default sort
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

    // user selectable css style options
    $scope.userStyles = [{
      'title': 'Default',
      'css_class': 'searchDefault'
    }, {
      'title': 'Midnight',
      'css_class': 'searchMidnight'
    }, {
      'title': 'Emerald',
      'css_class': 'searchEmerald'
    }, {
      'title': 'Blues',
      'css_class': 'searchBlues'
    }]
    $scope.userStyle = $scope.userStyles[0];  // default css style for table

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
