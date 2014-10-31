/* You can use this directive with the following tag <stamplay login-angellist></stamplay> */

app.directive('logout', ['userService', 'cookieService',

	function (userService, cookieService) {
		return {
			require: 'stamplay',
			scope: {},
			template: [
	     '<a ng-click="logout()" href="#" class="btn btn-primary" ng-show="user.dt_create" >',
	       'Logout',
	     '</a>'
			].join(''),

			link: function (scope, element, attrs, sc) {
				scope.user = userService.getUser();
				scope.$parent.listenOnUser(scope);
			},

			controller: function ($scope) {

				$scope.logout = function () {
					cookieService.eraseCookie('stamplayLogin');
					document.location.href = "/auth/v0/logout";
				}

			}


		};
}]);