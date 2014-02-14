var app = angular.module('DiscoverDataStructsApp', ['ngRoute']);
app.config(['$routeProvider', function($routeProvider){
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
      .when('/linkedList', {
        templateUrl: 'views/linkedList.html',
        controller: 'LinkedListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
