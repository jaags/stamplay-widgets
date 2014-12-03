app.directive('stripeAnonymousPayment', ['$modal',

	function ($modal) {

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
				return (attrs.templateUrl) ? _url + attrs.templateUrl : _url + 'stripe-anonymous-payment.html';
			},
			link: function (scope, element, attrs) {
				scope.templateUrlModal = attrs.templateUrlModal;
				scope.callbackEvents = {}
				scope.callbackEvents.successEvent = attrs['successEvent'] 
				scope.callbackEvents.errorEvent = attrs['errorEvent']
				scope.paymentInfo = {}
				scope.paymentInfo.amount = attrs['amount'];
				scope.paymentInfo.currency = attrs['currency'] || 'USD';
				if (scope.paymentInfo.currency != 'USD' && scope.paymentInfo.currency != 'GBP' && scope.paymentInfo.currency != 'EUR') {
					scope.paymentInfo.error = 'Currency not allow'
				}
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
				$scope.open = function () {
					var modalInstance = $modal.open({
						templateUrl: function () {
							var _url = _ASSETS_URL + '/assets/';
							return ($scope.templateUrlModal) ? _url + $scope.templateUrlModal : _url + 'stripe-anonymous-payment-modal.html';
						},
						backdrop: 'static',
						controller: 'paymentModalAnonymousController',
						keyboard: false,
						size: 'sm',
						resolve: {
							paymentInfo: function () {
								return $scope.paymentInfo
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

app.controller('paymentModalAnonymousController', function ($scope, $http, $rootScope, $modalInstance, paymentInfo, callbackEvents) {

	$scope.amount = parseFloat(paymentInfo.amount / 100)
	$scope.currency = paymentInfo.currency
	$scope.image = paymentInfo.image
	$scope.callbackEvents = callbackEvents

	$scope.cancel = function () {
		$scope.done()
	};
	$scope.errorModal = paymentInfo.error

	$scope.stripeCallback = function (code, result) {
		if (result.error) {
			$scope.errorPayment = 'Error'
		} else {
			var data = {}
			data.token = result.id
			data.currency = paymentInfo.currency
			data.amount = paymentInfo.amount
			$scope.cancel = function () {};
			$scope.process = true;
			$http({
					method: 'POST',
					url: '/api/stripe/v0/charges',
					data: data
				})
				.success(function (res) {
					$modalInstance.dismiss('cancel');
					if($scope.callbackEvents.successEvent)
						$rootScope.$broadcast($scope.callbackEvents.successEvent, res);
				}).error(function (err) {
					$scope.errorPayment = 'Error';
					if($scope.callbackEvents.errorEvent)
						$rootScope.$broadcast($scope.callbackEvents.errorEvent, err);
				}).finally(function () {
					$scope.cancel = function () {
						$scope.done()
					};
					$scope.process = false;
				})
		}
	};

	$scope.allValue = function (number, expiry, cvc) {
		if (!$scope.errorModal && !$scope.process) {
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