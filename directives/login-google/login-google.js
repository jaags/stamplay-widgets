/* You can use this directive with the following tag <stamplay login-google></stamplay> */

app.directive('loginGoogle', ['userService',

	function (userService) {
		return {
			require: 'stamplay',
			scope: {},
			template: [
	     '<a href="/auth/v0/google/connect" class="btn btn-primary" ng-hide="user.dt_create" >',
	       'Login with Google',
	     '</a>'
			].join(''),
			link: function (scope, element, attrs, sc) {
				scope.user = userService.getUser();
				scope.$parent.listenOnUser(scope);
			}
		};
}]);