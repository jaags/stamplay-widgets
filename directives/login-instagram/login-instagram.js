/* You can use this directive with the following tag <stamplay login-instagram></stamplay> */

app.directive('loginInstagram', ['userService',

	function (userService) {
		return {
			require: 'stamplay',
			scope: {},
			template: [
	     '<a href="/auth/v0/instagram/connect" class="btn btn-primary" ng-hide="user.dt_create" >',
	       'Login with Instagram',
	     '</a>'
			].join(''),
			link: function (scope, element, attrs, sc) {
				scope.user = userService.getUser();
				scope.$parent.listenOnUser(scope);
			}
		};
}]);