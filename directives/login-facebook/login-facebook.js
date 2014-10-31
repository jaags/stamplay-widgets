/* You can use this directive with the following tag <stamplay login-facebook></stamplay> */

app.directive('loginFacebook', ['userService',

	function (userService) {
		return {
			require: 'stamplay',
			scope: {},
			template: [
			       '<a href="/auth/v0/facebook/connect" class="btn btn-primary" ng-hide="user.dt_create">',
			         'Login with FB',
			       '</a>'
		].join(''),
			link: function (scope, element, attrs, sc) {
				scope.user = userService.getUser();
				scope.$parent.listenOnUser(scope);
			}
		};
}]);