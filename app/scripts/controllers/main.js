'use strict';

////////////////////////////TODO/////////
///figure out how to the get the maximum student consumption of fish

angular.module('econv4protoApp')
  .controller('MainCtrl', function ($scope) {

  	window.scope = $scope;

    $scope.studentProductionWood = 48;
    $scope.studentProductionFish = 0;
    
    $scope.barterPriceWood = 1;
    $scope.barterPriceFish = 125;     

    $scope.minStudentTradeWood = 0; //minstw
    $scope.maxStudentTradeWood = 28.8; //maxstw

    $scope.woodTradedToFriday = 0;

    $scope.studentConsumptionWood = 33;	//scw
 
    $scope.studentConsumptionFish = 1875;

    $scope.minStudentConsumptionWood = 19.2; //minscw
    $scope.maxStudentConsumptionWood = 48; //maxscw
    $scope.minStudentConsumptionFish = 0; //minscf
    $scope.maxStudentConsumptionFish = 3600; //maxscf

	$scope.studentGraphData = {
		production: {
			line: [[0, 2400],[48,0]],
			point: [48, 0],
			color: '#3bbfce'
		},
		consumption: {
			line: [[19.2, 3600],[48,0]],
			point: [33, 1875],
			color: '#CF2917'
		},
	    minMaxX: [0, 50],
   		minMaxY: [0, 4000]
    }; 

	$scope.fridayGraphData = {
		production: {
			line: [[0, 3600],[36,0]],
			point: [0, 3600],
			color: '#3bbfce'
		},
		consumption: {
			line: [[0, 3600],[28.8,0]],
			point: [15, 1775],
			color: '#CF2917'
		},
	    minMaxX: [0, 50],
   		minMaxY: [0, 4000]
    }; 

	$scope.setMaxStudentTradeWood = function() {
		if(3600/$scope.barterPriceFish >= 48 ){
			$scope.maxStudentTradeWood = 48;
		} else {
			$scope.maxStudentTradeWood = $scope.formatValue(3600/$scope.barterPriceFish);
		} 
	}
	$scope.setMinStudentConsumptionWood = function() {
		if($scope.studentProductionWood * $scope.barterPriceFish <= $scope.maxStudentConsumptionFish ){
			$scope.minStudentConsumptionWood = 0;
		} else {
			$scope.minStudentConsumptionWood = $scope.formatValue($scope.studentProductionWood - $scope.maxStudentConsumptionFish/$scope.barterPriceFish);
		} 
	}
	$scope.setStudentConsumptionFish = function() {
		if($scope.woodTradedToFriday * $scope.barterPriceFish <= 3600) {
			$scope.studentConsumptionFish = $scope.formatValue($scope.woodTradedToFriday * $scope.barterPriceFish);
		} else {
			$scope.studentConsumptionFish = 3600;			
		}
	}
	$scope.setMaxStudentConsumptionFish = function() {
		//48 * 75 = the max amount of fish friday can trade, 3600
		if($scope.barterPriceFish >= 75) {
			$scope.maxStudentConsumptionFish = 3600;	
		} else {
			$scope.maxStudentConsumptionFish = $scope.formatValue($scope.barterPriceFish * $scope.maxStudentTradeWood);
		}
	}
	$scope.setStudentConsumptionWood = function() {
		$scope.studentConsumptionWood = $scope.formatValue($scope.maxStudentConsumptionWood - $scope.woodTradedToFriday);
	}
	$scope.setWoodTradedToFriday = function () {
		$scope.woodTradedToFriday = $scope.formatValue($scope.maxStudentConsumptionWood - $scope.studentConsumptionWood);
	}
	$scope.updateGraphs = function() {
		$scope.updateStudentGraph();
		$scope.updateFridayGraph();
	}
	$scope.updateStudentGraph = function() {
		console.log("$scope.maxStudentConsumptionFish = "+$scope.maxStudentConsumptionFish);
		console.log("$scope.maxStudentTradeWood = "+$scope.maxStudentTradeWood);
		console.log("$scope.barterPriceFish = "+$scope.barterPriceFish);
		console.log("$scope.studentGraphData.consumption.line[0][1] = "+$scope.studentGraphData.consumption.line[0][1]);
		$scope.studentGraphData.consumption.line[0][1] = $scope.formatValue($scope.maxStudentTradeWood * $scope.barterPriceFish);
		$scope.studentGraphData.consumption.line[0][0] = $scope.minStudentConsumptionWood;
		// how much wood student has left over
		$scope.studentGraphData.consumption.point[0] = $scope.studentConsumptionWood;
		//how much fish student gets from Friday
		if($scope.barterPriceFish >= 75) {
		
		} else {

		}
		$scope.studentGraphData.consumption.point[1] = $scope.studentConsumptionFish;
	}
	$scope.updateFridayGraph = function() {
		var barterPrice = $scope.barterPriceFish;
		//max how much wood friday can consume
		//$scope.fridayGraphData.consumption.line[1][0] = $scope.formatValue($scope.maxStudentConsumptionFish/$scope.barterPriceFish);
		$scope.fridayGraphData.consumption.line[1][0] = $scope.maxStudentTradeWood;
		$scope.fridayGraphData.consumption.line[1][1] = 3600 - $scope.maxStudentConsumptionFish;

		//wood Friday gets from the student
		$scope.fridayGraphData.consumption.point[0] = $scope.woodTradedToFriday;
		//fish Friday has leftover after trading
		$scope.fridayGraphData.consumption.point[1] = 3600 - $scope.studentConsumptionFish;	
	}

	$scope.$watch('barterPriceFish', function() {
		$scope.setMaxStudentTradeWood();
		$scope.setMinStudentConsumptionWood();
		$scope.setStudentConsumptionFish();
		$scope.setMaxStudentConsumptionFish();
		$scope.updateGraphs();
	});

	$scope.$watch('woodTradedToFriday', function() {
		$scope.setStudentConsumptionWood();
		$scope.setStudentConsumptionFish();
		$scope.updateGraphs();
	});

	$scope.$watch('studentConsumptionWood', function() {
		$scope.setStudentConsumptionFish();
		$scope.setWoodTradedToFriday();
		$scope.updateGraphs();
	});

	$scope.$watch('studentConsumptionFish', function(newStudentConsumptionFish) {
		$scope.woodTradedToFriday = $scope.formatValue(newStudentConsumptionFish/$scope.barterPriceFish);
		$scope.updateGraphs();
	});

	$scope.formatValue = function(value) {
		return Math.round(value*10)/10;
	}


  });