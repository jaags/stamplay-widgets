/* You can use this directive with the following tag <stamplay login-dropbox></stamplay> */

app.directive('loginDropbox', ['userService',

	function (userService) {
		return {
			require: 'stamplay',
			scope: {},
			template: [
	     '<a href="/auth/v0/dropbox/connect" class="btn btn-primary" ng-hide="user.dt_create" >',
	       'Login with Dropbox',
	     '</a>'
			].join(''),
			link: function (scope, element, attrs, sc) {
				scope.user = userService.getUser();
				scope.$parent.listenOnUser(scope);
			}
		};
}]);