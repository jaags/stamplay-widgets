app.factory('stripeService', ['$http',
	function ($http) {

		var addCard = function (userId, data) {
			return $http({
				method: 'POST',
				url: '/api/stripe/v0/customers/' + userId + '/cards',
				data: data
			})
		};

		var getCards = function (userId) {
			return $http({
				method: 'GET',
				url: '/api/stripe/v0/customers/' + userId + '/cards'
			});
		};

		var chargeCard = function (data) {
			return $http({
				method: 'POST',
				url: '/api/stripe/v0/charges',
				data: data
			});
		};

		var changeCard = function (userId, data) {
			return $http({
				method: 'PUT',
				url: '/api/stripe/v0/customers/' + userId + '/cards',
				data: data
			});
		}

		return {
			addCard: addCard,
			getCards: getCards,
			chargeCard: chargeCard,
			changeCard: changeCard
		}

}]);