app.factory('userService', ['$http','$rootScope',
	function ($http, $rootScope) {

		var user;
		var req = new XMLHttpRequest();

		req.open('GET', '/api/user/v0/getStatus', false);
		req.setRequestHeader('Content-Type', 'application/json');

		req.onreadystatechange = function (e) {
			if (req.readyState !== 4) {
				return;
			}
			if ([200, 304].indexOf(req.status) === -1) {
				console.log('error');
			} else {
				var tmp = JSON.parse(req.responseText);
				if (!tmp.user) {
					user = {};
				} else {
					user = tmp.user;
				}
			}
		};

		req.send(void 0);

		return {
			getUser: function () {
				return user;
			},
			setUser: function(newUser){
				user = newUser;
				$rootScope.$broadcast('user:updated', newUser)
			}
		}

}]);