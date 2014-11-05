app.factory('formService', ['$http',
	function ($http) {

		var getSchema = function (formId) {
			return $http({
				method: 'GET',
				url: '/api/form/v0/forms?formId=' + formId + '&select=fields,title,onlyLoggedUser'
			});
		}

		var submit = function (formId, entry) {
			return $http({
				method: 'POST',
				url: '/api/form/v0/forms/' + formId + '/entries',
				data: entry
			});
		}

		return {
			getSchema: getSchema,
			submit: submit
		}

}]);