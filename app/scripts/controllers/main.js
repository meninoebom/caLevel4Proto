'use strict';

angular.module('econv4protoApp')
  .controller('MainCtrl', function ($scope) {

  	window.scope = $scope;

    $scope.initialWood = 5;
    $scope.studentProductionWood = 48;
    $scope.studentProductionFish = 0;
    
    $scope.barterPriceWood = 1;
    $scope.barterPriceFish = 125;     
    $scope.barterPrice = function() {
    	return $scope.barterPriceWood/$scope.barterPriceFish; //bp
    }

    $scope.minStudentTradeWood = 0; //minstw
    $scope.maxStudentTradeWood = 28.8; //maxstw

    $scope.fishTradedToFriday = 90; //ftf
    $scope.fishTradedFromFriday = 1875; //fff
    $scope.woodTradedToFriday = 48;
   // $scope.woodTradedToFriday = function() {	//wtf
    	//return $scope.studentProductionWood - $scope.studentConsumptionWood; 
    //}
    $scope.woodTradedFromFriday = 90; //wff
    $scope.studentConsumptionWood = 33;	//scw
    // $scope.studentConsumptionWood = function() {	//scw
    // 	return $scope.studentProductionWood - $scope.woodTradedToFriday;
    // }
    $scope.studentConsumptionFish = $scope.fishTradedFromFriday;

    $scope.minStudentConsumptionWood = 19.2; //minscw
    $scope.maxStudentConsumptionWood = 48; //maxscw
    $scope.minStudentConsumptionFish = 0; //minscf
    $scope.maxStudentConsumptionFish = 3600; //maxscf

    $scope.traderConsumptionWood = $scope.woodTradedToFriday; //tcw
    $scope.traderConsumptionFish = function() {
    	return 3600 - $scope.fishTradedFromFriday; //tcf
    }

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

	$scope.$watch('woodTradedToFriday', function(newWoodTradedToFirday) {
		$scope.studentConsumptionWood = $scope.maxStudentConsumptionWood - newWoodTradedToFirday;
		if(newWoodTradedToFirday * $scope.barterPriceFish <= $scope.maxStudentConsumptionFish) {
			$scope.studentConsumptionFish = newWoodTradedToFirday * $scope.barterPriceFish;
		} else {
			$scope.studentConsumptionFish = $scope.maxStudentConsumptionFish;			
		}
	});

	$scope.$watch('studentConsumptionWood', function(newStudentConsumptionWood) {
		var newWoodTradedToFriday = $scope.maxStudentConsumptionWood - newStudentConsumptionWood;
		if(newWoodTradedToFriday * $scope.barterPriceFish <= $scope.maxStudentConsumptionFish) {
			$scope.studentConsumptionFish = $scope.woodTradedToFriday * $scope.barterPriceFish;
		} else {
			$scope.studentConsumptionFish = 3600;			
		}
		$scope.woodTradedToFriday = newWoodTradedToFriday;
	});

	$scope.$watch('studentConsumptionFish', function(newStudentConsumptionFish) {
		$scope.woodTradedToFriday = $scope.formatValue(newStudentConsumptionFish/$scope.barterPriceFish);
	});

	$scope.formatValue = function(value) {
		return Math.round(value*10)/10;
	}
    
  });
