app.directive('photoGallery', ['userService', 'photoService', 'requestParserService',

	function (userService, photoService, requestParserService) {

		var _requestPhotos = function (status, sort, page, per_page, albumName, scope) {
			photoService.getPhotos(status, sort, page, per_page, albumName).success(function (response, status, headers) {
				scope.photos = response.data;
				var parts = headers('Link').split(',');
				scope.link = {}
				scope.paginator = [];
				requestParserService.parseLink(parts, scope.link);
				scope.link.page = headers('X-total-page')
				var page = parseInt(scope.link.page)
				for (var i = 1; i <= page; i++) {
					scope.paginator.push({
						url: scope.link.generic + '&page=' + i + '&per_page=' + scope.perPage,
						num: i
					})
				}
			});
		}

		return {
			require: '^stamplay',
			scope: {},

			templateUrl: function (elem, attrs) {
				var _url = _ASSETS_URL + '/assets/';
				return (attrs.templateUrl) ? _url + attrs.templateUrl : _url + 'photo-gallery.html';
			},

			link: function (scope, element, attrs, parentController) {
				scope.urlPhoto = attrs['photoSingleUrl'] || 'photo';
				scope.perPage = attrs['perPage'] || 5;
				scope.albumName = attrs['albumId'] || 'default';
				scope.activePage = 0;
				_requestPhotos(1, '-dt_create', 1, scope.perPage, scope.albumName, scope);
			},

			controller: function ($scope, $http) {
				$scope.callPhotos = function (url) {
					var page = requestParserService.getQueryParameter(url, 'page');
					$scope.activePage = page - 1;
					var perPage = requestParserService.getQueryParameter(url, 'per_page');
					_requestPhotos(1, '-dt_create', page, perPage, $scope.albumName, $scope)
				}
			}
		};
}]);