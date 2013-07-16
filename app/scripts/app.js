'use strict';

angular.module('econv4protoApp', ['ui','n3-charts.linechart','ui.slider'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
