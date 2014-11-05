/* You can use this directive with the following tag <stamplay login-dropbox></stamplay> */

app.directive('loginDropbox', ['userService',

	function (userService) {
		return {
			require: 'stamplay',
			scope: {},
			templateUrl: function (elem, attrs) {
				var _url = _ASSETS_URL + '/assets/';
				return (attrs.templateUrl) ? _url + attrs.templateUrl : _url + 'login-dropbox.html';
			},
			link: function (scope, element, attrs, sc) {
				scope.user = userService.getUser();
				scope.$parent.listenOnUser(scope);
			}
		};
}]);