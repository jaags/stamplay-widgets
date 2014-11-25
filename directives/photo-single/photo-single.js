app.directive('photoSingle', ['userService', 'photoService', 'requestParserService',

	function (userService, photoService, requestParserService) {
		var templateUrl = _ASSETS_URL + '/assets/photo-single.html';

		return {
			require: '^stamplay',
			scope: {},

			templateUrl: function (elem, attrs) {
				var _url = _ASSETS_URL + '/assets/';
				return (attrs.templateUrl) ? _url + attrs.templateUrl : _url + 'photo-single.html';
			},

			link: function (scope, element, attrs, parentController) {
				scope.user = userService.getUser();
				scope.photoId = requestParserService.getQueryParameter(document.location.href, 'photo-id')
				scope.wdgtActions = {}
				scope.wdgtActions.vote = attrs['vote'] || true;
				scope.wdgtActions.rate = attrs['rate'] || false;
				scope.rateNum = 0;
				scope.max = 5;
				scope.isReadonly = false;

				scope.hoveringOver = function (value) {
					scope.overStar = value;
				};

				scope.ratingStates = [
					{
						stateOn: 'glyphicon-ok-sign',
						stateOff: 'glyphicon-ok-circle'
					},
					{
						stateOn: 'glyphicon-star',
						stateOff: 'glyphicon-star-empty'
					},
					{
						stateOn: 'glyphicon-heart',
						stateOff: 'glyphicon-ban-circle'
					},
					{
						stateOn: 'glyphicon-heart'
					},
					{
						stateOff: 'glyphicon-off'
					}
			  ];

				photoService.getPhoto(scope.photoId).then(function (response) {
					scope.photo = response.data;
					if (scope.photo.actions.votes.users_upvote.indexOf(scope.user._id) == -1) {
						scope.voted = true
					} else {
						scope.voted = false
					}
					var find = false;
					for (var i = 0; i < scope.photo.actions.ratings.users.length && !find; i++) {
						if (scope.photo.actions.ratings.users[i].userId == scope.user._id) {
							find = true;
							scope.rateNum = scope.photo.actions.ratings.users[i].rating
							scope.isReadonly = true;
						}
					}

				}, function (err) {
					console.log(err)
				})
			},
			controller: function ($scope) {
				$scope.comment = function (text) {
					photoService.comment($scope.photoId, {
						text: text
					}).then(function (response) {
						var date = new Date()
						$scope.photo.actions.comments.push({
							picture: $scope.user.profileImg,
							displayName: $scope.user.displayName,
							text: text,
							dt_create: date
						})
						$scope.yourcomment = '';
					}, function (err) {
						console.log(err)
					})
				}
				$scope.vote = function (operation) {
					photoService.vote($scope.photoId, {
						type: operation
					}).then(function (response) {
						if (operation == 'upvote')
							$scope.voted = false;
						else
							$scope.voted = true;
					}, function (err) {
						console.log(err)
					})
				}
				$scope.rate = function (rating) {
					if (!$scope.isReadonly)
						photoService.rate($scope.photoId, {
							rate: rating
						}).then(function (response) {
							$scope.rateNum = rating;
							$scope.isReadonly = true;
						}, function (err) {
							console.log(err)
						})
				}
			}
		};
}]);