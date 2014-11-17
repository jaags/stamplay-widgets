/* You can use this directive with the following tag <stamplay form-submit data-form-id=""></stamplay> */

app.directive('formSubmit', ['userService', 'formService',

	function (userService, formService) {

		return {
			require: '^stamplay',
			scope: {},

			templateUrl: function (elem, attrs) {
				var _url = _ASSETS_URL + '/assets/';
				return (attrs.templateUrl) ? _url + attrs.templateUrl : _url + 'form-submit.html';
			},

			link: function (scope, element, attrs, parentController) {
				parentController.listenOnUser(scope);
				scope.user = userService.getUser();
				scope.formId = attrs.formId || null;
				scope.formmodel = {};

				formService.getSchema(scope.formId).success(function (response) {
					scope.form = response.data[0] || {};

					/* Order fields based on position attribute */
					var orderedFields = scope.form.fields.sort(function (field1, field2) {
						return field1.position - field2.position
					});
					scope.form.fields = orderedFields;

					/* If there is one or more checkbox we need to create a nested model in order to allow Angular to bind to the model  */
					scope.form.fields.forEach(function (field) {
						if (field.type === 'checkbox') {
							scope.formmodel[field.id] = {};
						}
					}, this);

				});
			},

			controller: function ($scope, $http) {

				$scope.someSelected = function (object) {
					if (object) {
						return Object.keys(object).some(function (key) {
							return object[key];
						});
					}
				}

				$scope.submit = function () {
					var toBeSubmitted = angular.copy($scope.formmodel);

					$scope.form.fields.forEach(function (field) {
						if (field.type === 'checkbox') {
							var oldValue = toBeSubmitted[field.id];
							toBeSubmitted[field.id] = [];
							var allKeys = Object.keys(oldValue);
							allKeys.forEach(function (key) {
								if (oldValue[key] != "false") {
									toBeSubmitted[field.id].push(oldValue[key]);
								}
							});
						}
					});

					formService.submit($scope.formId, toBeSubmitted).then(

						function (response) {
							$scope.submitSuccess = true;
						},

						function (error) {
							if (error.status == 403) {
								$scope.submitMustLogin = true;
							} else {
								var errMessage = error.data.message;
								switch (errMessage) {
								case 'Form Date expired':
									$scope.submitExpired = true;
									break;

								case 'Form has already been sent':
									$scope.submitAlreadyAnswered = true;
									break;

								default:
									$scope.submitError = true;
									break;
								}
							}
						}
					)
				}
			}

		}
		}]);