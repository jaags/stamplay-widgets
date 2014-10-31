app.factory('photoService', ['$http',
	function ($http) {

		var getPhotos = function (status, sort, page, per_page, albumName) {
			var fStatus = status || 1;
			var fSort = sort || '-dt_create';
			var fPage = page || 1;
			var fPerPage = per_page || 10;
			var fAlbumName = albumName || 'default';

			var queryParams = '?status=' + fStatus + '&sort=' + fSort + '&page=' + fPage + '&per_page=' + fPerPage + '&albumName=' + fAlbumName;

			return $http({
				method: 'GET',
				url: 'api/photo/v0/photos' + queryParams
			});
		};

		var getPhoto = function(id){
			return $http({
				method: 'GET',
				url: '/api/photo/v0/photos/' + id
			});
		}

		var comment = function(id, comment){
			return $http({
				method: 'PUT',
				url: '/api/photo/v0/photos/' + id + '/comment',
				data: comment
			});
		}

		var vote = function(id, type){
			return $http({
				method: 'PUT',
				url: '/api/photo/v0/photos/' + id + '/vote',
				data: type
			});
		}

		var rate = function(id, rate){
			return $http({
				method: 'PUT',
				url: '/api/photo/v0/photos/' + id + '/rate',
				data: rate
			});
		}


		return {
			getPhotos: getPhotos,
			getPhoto: getPhoto,
			comment: comment,
			vote: vote,
			rate: rate
		}
		
}]);