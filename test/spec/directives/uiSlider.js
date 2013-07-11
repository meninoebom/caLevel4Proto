'use strict';

describe('Directive: uiSlider', function () {
  beforeEach(module('econv4protoApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<ui-slider></ui-slider>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the uiSlider directive');
  }));
});
