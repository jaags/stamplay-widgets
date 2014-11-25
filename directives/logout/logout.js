/* You can use this directive with the following tag <stamplay login-angellist></stamplay> */

app.directive('logout', ['userService', 'cookieService',

	function (userService, cookieService) {
		return {
			require: '^stamplay',
			scope: {},

			templateUrl: function (elem, attrs) {
				var _url = _ASSETS_URL + '/assets/';
				return (attrs.templateUrl) ? _url + attrs.templateUrl : _url + 'logout.html';
			},

			link: function (scope, element, attrs, parentController) {
				scope.user = userService.getUser();
				parentController.listenOnUser(scope);
			},

			controller: function ($scope) {

				$scope.logout = function () {
					cookieService.eraseCookie('stamplayLogin');
					document.location.href = "/auth/v0/logout";
				}

			}


		};
}]);