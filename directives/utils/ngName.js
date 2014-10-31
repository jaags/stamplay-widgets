var ngNameDirective = ['$interpolate', function ($interpolate) {
  return {
      priority: 9999,
      controller: ['$scope', '$attrs', function ($scope, $attrs) {
          var interpolatedName = $interpolate($attrs.ngName)($scope);
          if (interpolatedName) $attrs.$set('name', interpolatedName);
      }]
  };
}];

app.directive('ngName', ngNameDirective);