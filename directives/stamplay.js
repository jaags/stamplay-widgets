app.directive('stamplay', ['userService', 'cookieService',

	function (userService, cookieService) {
		return {
			restrict: 'E',
			controller: [

				function ($scope, $http) {
					this.version = 'v0';
					if (window._APP_ID) {
						this.appId = _APP_ID;
					}

					this.listenOnUser = function (childScope) {
						childScope.$on('user:updated', function (event, data) {
							childScope.user = data;
						});
					}
				}

			],
			link: function (scope, element, attrs, sc) {
				if (attrs.redirect) {
					// Handles redirect

					var user = userService.getUser();
					var cookie = cookieService.readCookie('stamplayLogin');

					if (!user.dt_create && (!cookie || cookie == '1')) {
						cookieService.createCookie('stamplayLogin', '0', 5)
					}

					if (user.dt_create && cookie == 0 && attrs.redirect != '/') {
						cookieService.createCookie('stamplayLogin', '1', 5);
						window.location.href = attrs.redirect;
					}

				}
			}

		}
}]);