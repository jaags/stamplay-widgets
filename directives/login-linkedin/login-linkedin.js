/* You can use this directive with the following tag <stamplay login-linkedin></stamplay> */

app.directive('loginLinkedin', ['userService',

	function (userService) {
		return {
			require: 'stamplay',
			scope: {},
			template: [
	     '<a href="/auth/v0/linkedin/connect" class="btn btn-primary" ng-hide="user.dt_create" >',
	       'Login with Linkedin',
	     '</a>'
			].join(''),
			link: function (scope, element, attrs, sc) {
				scope.user = userService.getUser();
				scope.$parent.listenOnUser(scope);
			}
		};
}]);