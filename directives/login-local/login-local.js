app.directive('loginLocal', ['userService', 'loginService',

	function (userService, loginService) {
		var templateUrl = _ASSETS_URL + '/assets/login-local.html';

		return {
			require: '^stamplay',
			scope: {},

			templateUrl: function (elem, attrs) {
				var _url = _ASSETS_URL + '/assets/';
				return (attrs.templateUrl) ? _url + attrs.templateUrl : _url + 'login-local.html';
			},

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
				$scope.signin = function () {
					loginService.login($scope.login).then(function (response) {
						$scope.user = response.data;
						userService.setUser(response.data)
					}, function (err) {
						$scope.error = true
						$scope.message = err.data;
					})
				}
			}
		};
}]);