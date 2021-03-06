'use strict';

angular.module('imdbProjectApp')
  .controller('MainCtrl', function ($scope, $http, socket, ngTableParams, $filter, Auth) {
    // get current user if logged in
    $scope.currentUser = Auth.getCurrentUser();
    if($scope.currentUser.history) {
      $scope.currentUser.history.reverse();
      $scope.limithistory = 5;
    }

    // collects resutls from queries
    var searchResultsCombined = [];
    // identifies which result tables to show
    $scope.searchedName;
    // all collection containing names of people
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
        title: "Movie/TV Titles",
        collection: '/movies/distinctMovies/'
      },
      {
        title: "Producers",
        collection: '/producers/distinctProducers/'
      },
      {
        title: "Writers",
        collection: '/writers/distinctWriters/'
      }
    ];
    // multi select variables and functions
    $scope.to_search = {
      collections: []
    }
    // set all collections for search (check all button)
    $scope.checkAll = function() {
      $scope.to_search.collections = angular.copy($scope.collection_tables);
      for(var i = 0; i < $scope.to_search.collections.length; i++) {
        if($scope.to_search.collections[i].title == "Movie/TV Titles") {
          $scope.to_search.collections.splice(i, 1);
          break;
          }
      }

    };
    // uncheck any selected collections for search (uncheck all button)
    $scope.uncheckAll = function() {
      $scope.to_search.collections = [];
    };

    // search by Name on any select collections
    $scope.searchByName = function(criteria, collections){
      $scope.nameSearch = criteria || $scope.nameSearch;
      $scope.to_search.collections = collections || $scope.to_search.collections;
      logIt({type: 'searchByName', criteria: $scope.nameSearch, collections: $scope.to_search.collections});
      clearResults();
      searchResultsCombined = [];
      $scope.to_search.collections.forEach(function(collection) {
        $http.get('api' + collection.collection + $scope.nameSearch).success(function(a) {
          searchResultCombine(a, collection.title);
          $scope.resultShow.name_search = true;
        });
      });
    }

    // getTitleDetails
    $scope.getTitleDetails = function(title){
      logIt({type: 'getTitleDetails', criteria: title})
      $scope.searchedName = title;
      clearResults();
      searchResultsCombined = [];
      $scope.collection_tables.forEach(function(collection) {
        if (collection.collection.split('/')[1] !== "movies") {
          $http.get('api/' + collection.collection.split('/')[1] + "/byTitle/" +title).success(function(a) {
            searchResultCombine(a, collection.title);
            $scope.resultShow.title_details = true;
          });
        }
      });

    }

    // search by movie title
    $scope.searchForMovie = function(title){
      $scope.titleSearch = title || $scope.titleSearch;
      logIt({type: 'searchForMovie', criteria: $scope.titleSearch});
      $scope.searchedName = '';
      clearResults();
      searchResultsCombined = [];
      $http.get('api/movies/distinctMovies/' + $scope.titleSearch).success(function(a) {
        searchResultCombine(a, "");
        $scope.resultShow.titles_search = true;
      });
    }

    // titles based on individual
    $scope.getTitlesByNameAndTable = function(name, collection) {
      logIt({type: 'getTitlesByNameAndTable', criteria: name, collections: collection});
      searchResultsCombined = [];
      clearResults();
      var getUrl;
      $scope.searchedName = name;
      $scope.collection_tables.forEach(function(table) {
        if(table.title === collection) {
          getUrl = 'api/' + table.collection.split('/')[1] +  "/" + table.collection.split('/')[1] + "Titles/" + name
        }
      })
      $http.get(getUrl).success(function(a) {
        searchResultCombine(a, collection.title);
        $scope.resultShow.titles_for_name = true;
      });
    }

    $scope.searchAdvanced = function(name, collections, title) {

      $scope.nameSearch = name || $scope.nameSearch;
      $scope.to_search.collections = collections || $scope.to_search.collections;
      $scope.titleSearch = title || $scope.titleSearch;

      logIt({type: 'searchAdvanced', criteria: $scope.nameSearch, collections: $scope.to_search.collections, criteria2: $scope.titleSearch });
      $scope.searchedName = '';
      clearResults();
      searchResultsCombined = [];
      $scope.to_search.collections.forEach(function(collection) {
        $http.get('api/' + collection.collection.split('/')[1] + "/byNameAndTitle/" + $scope.titleSearch + "/" + $scope.nameSearch).success(function(a) {
          searchResultCombine(a, collection.title);
          $scope.resultShow.adv_search = true;
        });
      });
    }

    // function to combine results when calling on multiple collections
    var searchResultCombine = function(a, t) {
      searchResultsCombined = searchResultsCombined.concat(a.map(function(obj){
        if(t) {
          obj['table'] = t;
        }
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

    // clear-results-object
    var clearResults = function() {
      $scope.resultShow = {};
    }

    // table object, includes sorting and pagination
    var data = [];  // init search results array
    $scope.tableParams = new ngTableParams({
      page: 1,            // show first page
      count: 10,          // count per page
      sorting: {"name": 'asc'}         // set a default sort
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

    function logIt(details) {
      if($scope.currentUser._id) {
        $http.put('api/users/pushQuery/' + $scope.currentUser._id, {details: details}).success(function(a) {
          var temp = details;
          $scope.currentUser.history.unshift(temp)
        });
      }
    }

    $scope.runHistoryQuery = function(ind) {
      $scope[$scope.currentUser.history[ind].type]($scope.currentUser.history[ind].criteria, $scope.currentUser.history[ind].collections, $scope.currentUser.history[ind].criteria2)
    }
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
