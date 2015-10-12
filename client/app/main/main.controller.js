'use strict';

angular.module('imdbProjectApp')
  .controller('MainCtrl', function ($scope, $http, socket, ngTableParams, $filter) {
    var searchResultsCombined = [];
    $scope.collection_tables = [
      {
        title: "Actors",
        collection: '/actors/distinctActors/'
      },
      {
        title: "Actresses",
        collection: '/actresses/distinctActresses/'
      },
      {
        title: "Cinematographers",
        collection: '/cinematographers/distinctCinematographers/'
      },
      {
        title: "Composers",
        collection: '/composers/distinctComposers/'
      },
      {
        title: "Costume Designers",
        collection: '/costumeDesigners/distinctCostumeDesigners/'
      },
      {
        title: "Directors",
        collection: '/directors/distinctDirectors/'
      },
      {
        title: "Producers",
        collection: '/producers/distinctProducers/'
      }
    ];
    $scope.to_search = {
      collections: []
    }
    $scope.checkAll = function() {
      $scope.to_search.collections = angular.copy($scope.collection_tables);
    };
    $scope.uncheckAll = function() {
      $scope.to_search.collections = [];
    };

    $scope.searchByName = function(){
      clearResults();
      $scope.resultShow.name_search = true;
      searchResultsCombined = [];
      $scope.to_search.collections.forEach(function(collection) {
        $http.get('api' + collection.collection + $scope.nameSearch).success(function(a) {
          searchResultCombine(a, collection.title);
        });
      });

    }

    $scope.getTitlesByNameAndTable = function(name, collection) {
      searchResultsCombined = [];
      clearResults();
      var getUrl;
      $scope.collection_tables.forEach(function(table) {
        if(table.title === collection) {
          getUrl = 'api/' + table.collection.split('/')[1] +  "/" + table.collection.split('/')[1] + "Titles/" + name
        }
      })
      $http.get(getUrl).success(function(a) {
        searchResultCombine(a, collection.title);
      });
      $scope.resultShow.titles_for_name = true;
    }

    var data = [];  // init search results array
    var searchResultCombine = function(a, t) {
      // var reformattedArray = a.map(function(obj){
      //    obj['table'] = t;
      //    return obj;
      // });
      searchResultsCombined = searchResultsCombined.concat(a.map(function(obj){
         obj['table'] = t;
         if(obj['title']) {
           obj['title'] = obj['title'].replace(/\\"/g, "");
         }
         if(obj['role']) {
           obj['role'] = obj['role'].replace(/\[/g, "");
           obj['role'] = obj['role'].replace(/\]/g, "");
         }
         return obj;
      }));
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

    // clear-results-object
    var clearResults = function() {
      $scope.resultShow = {};
    }

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

    // test backend on page load
    // $http.get('/api/actors/actorTitles/Baychester, Robert Delanor').success(function(a) {
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
