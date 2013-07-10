'use strict';

angular.module('econv4protoApp')
  .controller('MainCtrl', function ($scope) {
  	$scope.woodProduction = 20;
  	$scope.fishProduction = 20;

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
