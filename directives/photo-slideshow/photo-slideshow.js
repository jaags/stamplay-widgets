/* You can use this directive with the following tag <stamplay login-instagram></stamplay> */
app.directive('photoSlideshow', ['userService', 'photoService',

	function (userService, photoService) {

		var templateUrl = _ASSETS_URL + '/assets/photo-slideshow.html';

		return {
			require: 'stamplay',
			scope: {},

			templateUrl: function (elem, attrs) {
				var _url = _ASSETS_URL + '/assets/';
				return (attrs.templateUrl) ? _url + attrs.templateUrl : _url + 'photo-slideshow.html';
			},

			link: function (scope, element, attrs, sc) {
				scope.user = userService.getUser();
				scope.$parent.listenOnUser(scope);
				scope.albumId = attrs.albumId || 'default';

				photoService.getPhotos(1, '-dt_create', 1, 10, scope.albumId).success(function (response) {
					scope.photos = response.data;
				})
			}
		}

		}]);