app.directive('photoGallery', ['userService', 'photoService', 'requestParserService',

	function (userService, photoService, requestParserService) {
		var templateUrl = _ASSETS_URL + '/assets/photo-gallery.html';
    
    var _requestPhotos = function(status, sort, page, per_page, albumName, scope){
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
	          url: scope.link.generic + '&page=' + i + '&per_page='+scope.perPage,
	          num: i
	        })
	      }
			});	
		}

		return {
			require: 'stamplay',
			scope: {},
			templateUrl:	templateUrl,
			
			link: function (scope, element, attrs, sc) {
				scope.urlPhoto = attrs['photoSingleUrl'] || 'photo';
				scope.perPage = attrs['perPage'] || 5;
				scope.albumName = attrs['albumName'] || 'default';
				scope.activePage = 0;
				_requestPhotos(1, '-dt_create', 1, scope.perPage, scope.albumName, scope);
			},

			controller: function ($scope, $http) {
				$scope.callPhotos = function(url){
					var page =  requestParserService.getQueryParameter(url, 'page');
					$scope.activePage = page - 1;
					var perPage = requestParserService.getQueryParameter(url, 'per_page');
					_requestPhotos(1, '-dt_create', page, perPage, $scope.albumName, $scope)
				}
			}
		};
}]);