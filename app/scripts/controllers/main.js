'use strict';

angular.module('econv4protoApp')
  .controller('MainCtrl', function ($scope) {

  	window.scope = $scope;

    $scope.initialWood = 5;
    $scope.studentProductionWood = 48;
    $scope.studentProductionFish = 0;

    $scope.fridayProductionFish =
    
    $scope.barterPriceWood = 1;
    $scope.barterPriceFish = 125;     
    $scope.barterPrice = $scope.barterPriceWood/$scope.barterPriceFish; //bp

    $scope.minStudentTradeWood = 0; //minstw
    $scope.maxStudentTradeWood = 28.8; //maxstw

    $scope.fishTradedToFriday = 90; //ftf
    $scope.fishTradedFromFriday = 1875; //fff
    $scope.woodTradedToFriday = 15;

    $scope.woodTradedFromFriday = 90; //wff
    $scope.studentConsumptionWood = 33;	//scw
 
    $scope.studentConsumptionFish = 1875;

    $scope.minStudentConsumptionWood = 19.2; //minscw
    $scope.maxStudentConsumptionWood = 48; //maxscw
    $scope.minStudentConsumptionFish = 0; //minscf
    $scope.maxStudentConsumptionFish = 3600; //maxscf

    $scope.graphOptions = {
	  axes: {
	    x: {type: 'linear', tooltipFormatter: function(x) {return x;}}
	  },
	  series: [
	    {y: 'production', color: '#3bbfce', label: 'Production (lbs)'},
	    {y: 'consumption', color: '#CF2917', label: 'Consumption (lbs)'}
	  ],
	  //lineMode: 'linear'
	}

	$scope.studentGraphData = [
	  {x: 0, production: 2400, consumption: 3600},
	  {x: 48, production: 0, consumption: 0}
	]; 

	$scope.fridayGraphData = [
	  {x: 0, production: 3600, consumption: 3600},
	  {x: 15, production: 0, consumption: 1775}//,
	  //{x: 28.8, production: 0, consumption: 0},
	  // {x: 36, production: 0, consumption: 0}
	]; 

	$scope.updateGraphs = function() {
		$scope.updateStudentGraph();
		$scope.updateFridayGraph();
	}
	$scope.updateStudentGraph = function() {
		console.log("updateStudentGraph");
		var barterPrice = $scope.barterPriceFish;
		//had to add true (!0) as param to watch call back in link-chart.min.js: d.$watch("data",d.update,!0)
		$scope.studentGraphData[0].consumption = barterPrice*28.8;
	}
	$scope.updateFridayGraph = function() {
		var barterPrice = $scope.barterPriceFish;
		//had to add true (!0) as param to watch call back in link-chart.min.js: d.$watch("data",d.update,!0)
		var newY = $scope.maxStudentConsumptionFish - barterPrice * 36;
		$scope.fridayGraphData[1].consumption = newY;
	}

	$scope.$watch('barterPriceFish', function(newBarterPriceFish) {
		$scope.barterPrice = $scope.barterPriceWood/newBarterPriceFish;
		
		var newMaxStudentTradeWood = $scope.formatValue($scope.maxStudentConsumptionFish/newBarterPriceFish);
		if(newMaxStudentTradeWood >= $scope.studentProductionWood ){
			$scope.maxStudentTradeWood = $scope.studentProductionWood;
		} else {
			$scope.maxStudentTradeWood = newMaxStudentTradeWood;
		} 

		var newMinStudentConsumptionWood = $scope.formatValue($scope.studentProductionWood - $scope.maxStudentConsumptionFish/newBarterPriceFish);
		if($scope.studentProductionWood*newBarterPriceFish <= $scope.maxStudentConsumptionFish ){
			$scope.minStudentConsumptionWood = 0;
		} else {
			$scope.minStudentConsumptionWood = newMinStudentConsumptionWood;
		} 
		
		$scope.studentConsumptionFish = $scope.formatValue($scope.woodTradedToFriday*$scope.barterPriceFish);
		$scope.maxStudentConsumptionFish = $scope.formatValue($scope.barterPriceFish*$scope.maxStudentTradeWood);

		$scope.updateGraphs();
	});

	$scope.$watch('woodTradedToFriday', function(newWoodTradedToFriday) {
		$scope.studentConsumptionWood = $scope.maxStudentConsumptionWood - newWoodTradedToFriday;
		if(newWoodTradedToFriday * $scope.barterPriceFish <= $scope.maxStudentConsumptionFish) {
			$scope.studentConsumptionFish = $scope.formatValue(newWoodTradedToFriday * $scope.barterPriceFish);
		} else {
			$scope.studentConsumptionFish = $scope.formatValue($scope.maxStudentConsumptionFish);			
		}
	});

	$scope.$watch('studentConsumptionWood', function(newStudentConsumptionWood) {
		var newWoodTradedToFriday = $scope.maxStudentConsumptionWood - newStudentConsumptionWood;
		if(newWoodTradedToFriday * $scope.barterPriceFish <= $scope.maxStudentConsumptionFish) {
			$scope.studentConsumptionFish = $scope.formatValue($scope.woodTradedToFriday * $scope.barterPriceFish);
		} else {
			$scope.studentConsumptionFish = $scope.formatValue($scope.maxStudentConsumptionFish);			
		}
		$scope.woodTradedToFriday = $scope.formatValue(newWoodTradedToFriday);
	});

	$scope.$watch('studentConsumptionFish', function(newStudentConsumptionFish) {
		$scope.woodTradedToFriday = $scope.formatValue(newStudentConsumptionFish/$scope.barterPriceFish);
	});

	$scope.formatValue = function(value) {
		return Math.round(value*10)/10;
	}


  });
