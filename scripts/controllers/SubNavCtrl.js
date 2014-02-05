angular.module('DiscoverDataStructsApp').controller('SubNavCtrl', function($scope, $location){
  'use strict';

  $scope.getActive = function(path){
    return ($location.path().indexOf(path) === 0) ? "active" : "";
  };

});
