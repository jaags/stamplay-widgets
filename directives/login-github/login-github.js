/* You can use this directive with the following tag <stamplay login-github></stamplay> */

app.directive('loginGithub', ['userService',

	function (userService) {
		return {
			require: '^stamplay',
			scope: {},
			templateUrl: function (elem, attrs) {
				var _url = _ASSETS_URL + '/assets/';
				return (attrs.templateUrl) ? _url + attrs.templateUrl : _url + 'login-github.html';
			},
			link: function (scope, element, attrs, parentController) {
				scope.user = userService.getUser();
				parentController.listenOnUser(scope);
			}
		};
}]);