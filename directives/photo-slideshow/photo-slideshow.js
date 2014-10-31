/* You can use this directive with the following tag <stamplay login-instagram></stamplay> */
app.directive('photoSlideshow', ['userService', 'photoService',

	function (userService, photoService) {

		var templateUrl = _ASSETS_URL + '/assets/photo-slideshow.html';

		return {
			require: 'stamplay',
			scope: {},
			templateUrl: templateUrl,
			link: function (scope, element, attrs, sc) {
				scope.user = userService.getUser();
				scope.$parent.listenOnUser(scope);
				scope.albumName = attrs.albumName || 'default';

				photoService.getPhotos(1, '-dt_create', 1, 10, scope.albumName).success(function(response) {
					scope.photos = response.data;
				})
			}
		}

		}]);