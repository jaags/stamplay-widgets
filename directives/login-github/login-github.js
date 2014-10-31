/* You can use this directive with the following tag <stamplay login-github></stamplay> */

app.directive('loginGithub', ['userService',

	function (userService) {
		return {
			require: 'stamplay',
			scope: {},
			template: [
	     '<a href="/auth/v0/github/connect" class="btn btn-primary" ng-hide="user.dt_create" >',
	       'Login with Github',
	     '</a>'
			].join(''),
			link: function (scope, element, attrs, sc) {
				scope.user = userService.getUser();
				scope.$parent.listenOnUser(scope);
			}
		};
}]);