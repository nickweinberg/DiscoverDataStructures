angular.module('DiscoverDataStructsApp', []).config(function($routeProvider){
  'use strict';

  // Routes
  // ==========================================================================
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    })
    .when('/stack', {
      templateUrl: 'views/stack.html',
      controller: 'DS-StackCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
