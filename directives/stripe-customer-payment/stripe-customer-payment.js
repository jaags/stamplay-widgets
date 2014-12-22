app.directive('stripeCustomerPayment', ['$modal', 'userService', 'stripeService', '$q',

/*

	[required] data-key 								: the Stripe public key 
	[required] data-amount 							: the amount in cents to be charged 
	[optional] data-currency						: the currency of the transaction (default: USD)
	[optional] data-template-url-modal 	: if provided will be used as model template 
	[optional] data-success-event				: if provided an event with this name will be emitted when charge is successful
	[optional] data-error-event					: if provided an event with this name will be emitted when charge is unsuccessful
	[optional] data-image-url 					: if provided an image with this url will be used in the modal

*/
	function ($modal, userService, stripeService, $q) {

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

				/* Loading and initializing Stripe js */
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
							stripeService: function () {
								return stripeService
							},
							getCards: function () {
								var deferred = $q.defer();
								if ($scope.user && $scope.user._id) {
									stripeService.getCards($scope.user._id)
										.success(function (response) {
											deferred.resolve(response);
										})
										.error(function (err) {
											if (err.error.status == 403) {
												deferred.resolve({});
											} else {
												deferred.reject(err);
											}
										});
								} else {
									deferred.resolve({});
								}
								return deferred.promise;
							},
							paymentInfo: function () {
								return $scope.paymentInfo;
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

app.controller('paymentModalCustomerController', function ($scope, getCards, $http, $rootScope, $modalInstance, paymentInfo, user, stripeService, callbackEvents) {
	$scope.card = getCards.card_id;
	if ($scope.card) {
		$scope.last4 = getCards.last4;
		$scope.wantAddCard = false;
	} else {
		$scope.wantAddCard = true;
	}

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
			var data = {};
			data.token = result.id;
			data.currency = paymentInfo.currency;
			data.amount = paymentInfo.amount;
			data.userId = $scope.user._id;

			if ($scope.card && $scope.wantAddCard) {
				/* Have already a card and I'm inserting a new card */
				var changeCardData = {
					userId: $scope.user._id,
					token: result.id
				};
				delete data.token;
				changeCard(changeCardData, data);
			} else {
				chargeApiCall(data);
			}

		}
	};

	$scope.chargeUser = function (selectedCardId) {
		var data = {};
		data.currency = paymentInfo.currency;
		data.amount = paymentInfo.amount;
		data.userId = $scope.user._id;
		chargeApiCall(data);
	}

	function changeCard(changeCardData, data) {
		$scope.cancel = function () {};
		$scope.process = true;
		stripeService.changeCard($scope.user._id, changeCardData)
			.success(function () {
				chargeApiCall(data);
			})
			.error(function () {
				$scope.errorPayment = 'Error';
				$scope.process = false;
				$scope.cancel = function () {
					$scope.done()
				};
				if ($scope.callbackEvents.errorEvent)
					$rootScope.$broadcast($scope.callbackEvents.errorEvent);		
			})
	}

	function chargeApiCall(data) {
		$scope.cancel = function () {};
		$scope.process = true;

		stripeService.chargeCard(data)
			.success(function (res) {
				$modalInstance.dismiss('cancel');
				if ($scope.callbackEvents.successEvent)
					$rootScope.$broadcast($scope.callbackEvents.successEvent, res);	
			}).error(function (err) {
				$scope.errorPayment = 'Error';
				if ($scope.callbackEvents.errorEvent)
					$rootScope.$broadcast($scope.callbackEvents.errorEvent, err);
			}).finally(function () {
				$scope.process = false;
				$scope.cancel = function () {
					$scope.done()
				};
			});
	}

	$scope.allValue = function (number, expiry, cvc, selectedCardId) {
		var result;
		if (!$scope.wantAddCard) {
			result = hasCardSelected(selectedCardId);
		} else {
			result = isCardValid($scope, number, expiry, cvc);
		}
		return result;
	};

	function isCardValid($scope, number, expiry, cvc) {
		if (!$scope.errorModal && !$scope.errorLogin && !$scope.process) {
			if (!number || !expiry || !cvc)
				return false;
			return true;
		} else
			return false;
	}

	function hasCardSelected(selectedCardId) {
		return (!$scope.wantAddCard && selectedCardId);
	};

	$scope.done = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.toggleAddCard = function () {
		$scope.wantAddCard = !$scope.wantAddCard;
	}
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