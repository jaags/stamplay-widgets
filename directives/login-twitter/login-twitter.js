/* You can use this directive with the following tag <stamplay login-twitter></stamplay> */

app.directive('loginTwitter', ['userService',

	function (userService) {
		return {
			require: 'stamplay',
			scope: {},
			template: [
	     '<a href="/auth/v0/twitter/connect" class="btn btn-primary" ng-hide="user.dt_create" >',
	       'Login with Twitter',
	     '</a>'
			].join(''),
			link: function (scope, element, attrs, sc) {
				scope.user = userService.getUser();
				scope.$parent.listenOnUser(scope);
			}
		};
}]);