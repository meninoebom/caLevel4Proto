'use strict';

angular.module('econv4protoApp')
	.directive('uiSlider',['ui.config', function(uiConfig) {
		uiConfig.uiSlider = uiConfig.uiSlider || {}; 
		return {
			restrict: 'A',
			scope: {
				values: '=ngModel',
				sliderParams: '=sliderParams'
			},
			
			link:function(scope,elm,$attrs,uiEvent ) {
				var expression;
				
				var options = {
					// range: true,
					value: scope.values,
					slide: function(event,ui){
						scope.$apply(function(){
							scope.values = ui.value;
						});
					}
				};
				
				if (scope.sliderParams) {
					expression = {min:0, max:scope.sliderParams};
				}  else if ($attrs.uiSlider) {
					expression = scope.$eval($attrs.uiSlider);
				} else {
					expression = {};
				}
				
				//Set the options from the directive's configuration
				angular.extend(options, uiConfig.devCalendar, expression);
				elm.slider(options);
				
				scope.$watch('values', function() {
					elm.slider('value', scope.values);
				});
				
				scope.$watch('sliderParams', function() {
					elm.slider('option', 'max', scope.sliderParams);
					elm.slider('value', scope.values);
				});
				
			}

		};
	
	}]);
