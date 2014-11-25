app.directive('nxEqual', function () {
	return {
		require: 'ngModel',
		link: function (scope, elem, attrs, model) {
			if (!attrs.nxEqual) {
				console.error('nxEqual expects a model as an argument!');
				return;
			}
			scope.$watch(attrs.nxEqual, function (value) {
				model.$setValidity('nxEqual', value === model.$viewValue);
			});
			model.$parsers.push(function (value) {
				var isValid = value === scope.$eval(attrs.nxEqual);
				model.$setValidity('nxEqual', isValid);
				return isValid ? value : undefined;
			});
		}
	};
});

app.directive('userSignup', ['userService', 'loginService',

	function (userService, loginService) {
		var templateUrl = _ASSETS_URL + '/assets/user-signup.html';

		return {
			require: '^stamplay',
			scope: {},
			templateUrl: templateUrl,
			link: function (scope, element, attrs, parentController) {
				scope.user = userService.getUser();
				parentController.listenOnUser(scope);
				scope.pattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/
				if (scope.user._id) {
					scope.notLogged = false;
				} else {
					scope.notLogged = true;
				}
			},
			controller: function ($scope, $http) {
				$scope.signup = function () {
					var toBeSubmitted = angular.copy($scope.register);
					delete toBeSubmitted.verify;
					loginService.register(toBeSubmitted).then(function (response) {
						$scope.notLogged = false;
						userService.setUser(response.data)
					}, function (err) {
						$scope.error = true
						$scope.message = err.data.error.message;
					})
				}
			}
		};
}]);