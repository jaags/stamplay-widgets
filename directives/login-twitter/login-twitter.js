/* You can use this directive with the following tag <stamplay login-twitter></stamplay> */

app.directive('loginTwitter', ['userService',

	function (userService) {
		return {
			require: 'stamplay',
			scope: {},
			templateUrl: function (elem, attrs) {
				var _url = _ASSETS_URL + '/assets/';
				return (attrs.templateUrl) ? _url + attrs.templateUrl : _url + 'login-twitter.html';
			},
			link: function (scope, element, attrs, sc) {
				scope.user = userService.getUser();
				scope.$parent.listenOnUser(scope);
			}
		};
}]);