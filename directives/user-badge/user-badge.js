app.directive('userBadge', ['userService', 'loginService',

	function (userService, loginService) {
		var templateUrl = _ASSETS_URL + '/assets/user-badge.html';

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