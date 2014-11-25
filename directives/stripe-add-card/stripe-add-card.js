app.directive('stripeAddCard', ['$modal', 'userService',

	function ($modal, userService) {

		function loadScript(url, callback) {
			var head = document.getElementsByTagName("head")[0];
			var script = document.createElement("script");
			script.src = url;
			// Attach handlers for all browsers
			var done = false;
			script.onload = script.onreadystatechange = function () {
				if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
					done = true;
					// Continue your code
					callback();
					// Handle memory leak in IE
					script.onload = script.onreadystatechange = null;
					head.removeChild(script);
				}
			};
			head.appendChild(script);
		}
		return {
			require: '^stamplay',
			scope: {},
			templateUrl: function (elem, attrs) {
				var _url = _ASSETS_URL + '/assets/';
				return (attrs.templateUrl) ? _url + attrs.templateUrl : _url + 'stripe-add-card.html';
			},
			link: function (scope, element, attrs, parentController) {
				scope.templateUrlModal = attrs.templateUrlModal;
				scope.callbackEvents = {}
				scope.callbackEvents.successEvent = attrs['successEvent'] 
				scope.callbackEvents.errorEvent = attrs['errorEvent']

				scope.user = userService.getUser();
				parentController.listenOnUser(scope);

				scope.paymentInfo = {}
				scope.paymentInfo.image = attrs['imageUrl'] || false;
				if (window.Stripe) {
					window.Stripe.setPublishableKey(attrs['key']);
				} else {
					loadScript("https://js.stripe.com/v2/", function () {
						window.Stripe.setPublishableKey(attrs['key']);
					})
				}
			},
			controller: function ($scope, $modal) {
				$scope.openAddCardModal = function () {
					var modalInstance = $modal.open({
						templateUrl: function () {
							var _url = _ASSETS_URL + '/assets/';
							return ($scope.templateUrlModal) ? _url + $scope.templateUrlModal : _url + 'stripe-add-card-modal.html';
						},
						backdrop: 'static',
						controller: 'addCardModalController',
						keyboard: false,
						size: 'sm',
						resolve: {
							paymentInfo: function () {
								return $scope.paymentInfo
							},
							user: function () {
								return userService.getUser()
							},
							callbackEvents: function(){
								return $scope.callbackEvents
							}
						}
					});
				}
			}
		};
}]);

app.controller('addCardModalController', function ($scope, $http, $rootScope, $modalInstance, paymentInfo, user, callbackEvents) {

	$scope.image = paymentInfo.image
	$scope.callbackEvents = callbackEvents

	$scope.cancel = function () {
		$scope.done()
	};
	if (Object.keys(user).length > 0) {
		$scope.user = user
	} else {
		$scope.errorLogin = 'You must be logged'
	}

	$scope.stripeCallback = function (code, result) {
		if (result.error) {
			$scope.errorPayment = 'Error'
		} else {
			var data = {}
			data.token = result.id
			$scope.cancel = function () {};
			$scope.process = true;
			$http({
					method: 'POST',
					url: '/api/stripe/v0/customers/' + $scope.user._id + '/cards',
					data: data
				})
				.success(function (res) {
					$modalInstance.dismiss('cancel');
					if($scope.callbackEvents.successEvent)
						$rootScope.$broadcast($scope.callbackEvents.successEvent);
				}).error(function (err) {
					$scope.errorPayment = 'Error';
					if($scope.callbackEvents.errorEvent)
						$rootScope.$broadcast($scope.callbackEvents.errorEvent);
				}).finally(function () {
					$scope.process = false;
					$scope.cancel = function () {
						$scope.done()
					};
				})
		}
	};

	$scope.allValue = function (number, expiry, cvc) {
		if (!$scope.errorLogin && !$scope.process) {
			if (!number || !expiry || !cvc)
				return false
			return true
		} else
			return false
	}

	$scope.done = function () {
		$modalInstance.dismiss('cancel');
	};
})