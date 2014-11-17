app.directive('stripeCustomerPayment', ['$modal', 'userService',

/*

	[required] data-key 								: the Stripe public key 
	[required] data-amount 							: the amount in cents to be charged 
	[optional] data-currency						: the currency of the transaction (default: USD)
	[optional] data-template-url-modal 	: if provided will be used as model template 
	[optional] data-success-event				: if provided an event with this name will be emitted when charge is successful
	[optional] data-error-event					: if provided an event with this name will be emitted when charge is unsuccessful
	[optional] data-image-url 					: if provided an image with this url will be used in the modal

*/
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
				return (attrs.templateUrl) ? _url + attrs.templateUrl : _url + 'stripe-customer-payment.html';
			},

			link: function (scope, element, attrs, parentController) {
				/* Listen on user changes */
				parentController.listenOnUser(scope);
				scope.user = userService.getUser();

				/* If it's present a custom template url will be used*/
				scope.templateUrlModal = attrs.templateUrlModal;

				/* Saving success and error callbacks */
				scope.callbackEvents = {}
				scope.callbackEvents.successEvent = attrs['successEvent']
				scope.callbackEvents.errorEvent = attrs['errorEvent']

				/* Saving payment info */
				scope.paymentInfo = {}
				scope.paymentInfo.amount = attrs['amount'];
				scope.paymentInfo.currency = attrs['currency'] || 'USD';
				if (scope.paymentInfo.currency != 'USD' && scope.paymentInfo.currency != 'GBP' && scope.paymentInfo.currency != 'EUR') {
					scope.paymentInfo.error = 'Currency not allowed'
				}
				scope.paymentInfo.image = attrs['imageUrl'] || false;
				if (window.Stripe) {
					window.Stripe.setPublishableKey(attrs['key']);
				} else {
					loadScript("https://js.stripe.com/v2/", function () {
						window.Stripe.setPublishableKey(attrs['key']);
					});
				}
			},
			controller: function ($scope, $modal) {
				$scope.open = function () {
					var modalInstance = $modal.open({
						templateUrl: function () {
							var _url = _ASSETS_URL + '/assets/';
							return ($scope.templateUrlModal) ? _url + $scope.templateUrlModal : _url + 'stripe-customer-payment-modal.html';
						},
						controller: 'paymentModalCustomerController',
						keyboard: false,
						backdrop: 'static',
						size: 'sm',
						resolve: {
							paymentInfo: function () {
								return $scope.paymentInfo
							},
							user: function () {
								return userService.getUser()
							},
							callbackEvents: function () {
								return $scope.callbackEvents
							}
						}
					});
				}
			}
		};
}]);

app.controller('paymentModalCustomerController', function ($scope, $http, $rootScope, $modalInstance, paymentInfo, user, callbackEvents) {

	$scope.amount = parseFloat(paymentInfo.amount / 100)
	$scope.currency = paymentInfo.currency
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
	$scope.errorModal = paymentInfo.error

	$scope.stripeCallback = function (code, result) {
		if (result.error) {
			$scope.errorPayment = 'Error'
		} else {
			var data = {}
			data.token = result.id
			data.currency = paymentInfo.currency
			data.amount = paymentInfo.amount
			data.userId = $scope.user._id
			$scope.cancel = function () {};
			$scope.process = true;
			$http({
					method: 'POST',
					url: '/api/stripe/v0/charges',
					data: data
				})
				.success(function (res) {
					$modalInstance.dismiss('cancel');
					if ($scope.callbackEvents.successEvent)
						$rootScope.$broadcast($scope.callbackEvents.successEvent);
				}).error(function (err) {
					$scope.errorPayment = 'Error';
					if ($scope.callbackEvents.errorEvent)
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
		if (!$scope.errorModal && !$scope.errorLogin && !$scope.process) {
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

app.filter('currencyStripe', function () {
	return function (number, currencyCode) {
		var currency = {
				USD: "$",
				GBP: "£",
				EUR: "€",
			},
			thousand, decimal, format;
		if (currencyCode == "USD") {
			thousand = ",";
			decimal = ".";
			format = "%s%v";
		} else {
			thousand = ".";
			decimal = ",";
			format = "%s%v";
		};
		return accounting.formatMoney(number, currency[currencyCode], 2, thousand, decimal, format);
	};
});