angular.module('DiscoverDataStructsApp', ['ngRoute']).config(function($routeProvider){
  'use strict';

  console.log('hi');

  // Routes
  // ==========================================================================
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    })
    .when('/stack', {
      templateUrl: 'views/stack.html',
      controller: 'StackCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
