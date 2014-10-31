app.directive('userNavbadge', ['userService', 'loginService',

	function (userService, loginService) {
		var templateUrl = _ASSETS_URL + '/assets/user-navbadge.html';

		return {
			require: 'stamplay',
			scope: {},
			templateUrl:	templateUrl,
			link: function (scope, element, attrs, sc) {
				scope.user = userService.getUser();
				scope.$parent.listenOnUser(scope);
			},
			controller: function ($scope, $http) {}
		};
}]);