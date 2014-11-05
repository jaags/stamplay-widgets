app.factory('loginService', ['$http',
	function ($http) {

		var login = function (data) {
			return $http({
				method: 'POST',
				url: '/auth/v0/local/login',
				data: data 
			});
		}

		var register = function (data) {
			return $http({
				method: 'POST',
				url: '/api/user/v0/users',
				data: data
			});
		}

		return {
			login: login,
			register: register
		}

}]);