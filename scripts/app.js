angular.module('DiscoverDataStructsApp', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider){
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
        controller: 'StackCtrl'
      })
      .when('/queue', {
        templateUrl: 'views/queue.html',
        controller: 'QueueCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
