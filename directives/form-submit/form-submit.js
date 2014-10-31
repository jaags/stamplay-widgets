/* You can use this directive with the following tag <stamplay form-submit></stamplay> */

app.directive('formSubmit', ['userService', 'formService',

	function (userService, formService) {
		var templateUrl = _ASSETS_URL + '/assets/form-submit.html';
		return {
			require: 'stamplay',
			scope: {},
			templateUrl: templateUrl,
			link: function (scope, element, attrs, sc) {
				scope.user = userService.getUser();
				scope.formId = attrs.formId || null;
				scope.abc = {};
				formService.getSchema(scope.formId).success(function (response) {
					scope.form = response.data[0] || {};
				});
			},

			controller: function ($scope, $http) {

				$scope.someSelected = function (object) {
					if(object){
					  return Object.keys(object).some(function (key) {
					    return object[key];
					  });
				  }
				}

				$scope.submit = function () {
					var toBeSubmitted = angular.copy($scope.abc);

					$scope.form.fields.forEach(function (field) {
						if (field.type === 'checkbox') {
							var oldValue = toBeSubmitted[field.id];
							toBeSubmitted[field.id] = [];
							var allKeys = Object.keys(oldValue);
							allKeys.forEach(function (key) {
								if(oldValue[key] != "false"){
									toBeSubmitted[field.id].push(oldValue[key]);
								}
							});
						}
					});

					formService.submit($scope.formId, toBeSubmitted).then(
						
						function (response) {
							$scope.submitSuccess = true;
						},
						 
						function(error) {
	              if (error.status == 403){
	              	$scope.submitMustLogin = true;
	              }else{
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