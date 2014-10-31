/* You can use this directive with the following tag <stamplay login-angellist></stamplay> */

app.directive('loginAngellist', ['userService',

	function (userService) {
		
		return {
			require: 'stamplay',
			scope: {},
			template: [
	     '<a href="/auth/v0/angellist/connect" class="btn btn-primary" ng-hide="user.dt_create" >',
	       'Login with Angellist',
	     '</a>'
			].join(''),
			link: function (scope, element, attrs, sc) {
				scope.user = userService.getUser();
				scope.$parent.listenOnUser(scope);
			}
		};
}]);