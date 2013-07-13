'use strict';

angular.module('econv4protoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.initialWood = 5;
    $scope.barterPriceFish = 125;



	$scope.data = [
	  {x: 0, value: 4, otherValue: 14},
	  {x: 1, value: 8, otherValue: 1},
	  {x: 2, value: 15, otherValue: 11},
	  {x: 3, value: 16, otherValue: 147},
	  {x: 4, value: 23, otherValue: 87},
	  {x: 5, value: 42, otherValue: 45}
	]; 

	$scope.options = {
	  axes: {
	    x: {type: 'linear', tooltipFormatter: function(x) {return x;}}
	  },
	  series: [
	    {y: 'value', color: '#3bbfce', label: 'Production (lbs)'},
	    {y: 'otherValue', color: '#CF2917', label: 'Consumption (lbs)'}
	  ],
	  //lineMode: 'linear'
	}
    
  });
