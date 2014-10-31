app.factory('cookieService', [

	function () {

		//Cookie handling functions
		var createCookie = function (name, value, days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			} else var expires = "";
			document.cookie = name + "=" + value + expires + "; path=/";
		};

		var readCookie = function (name) {
			return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
		};

		var eraseCookie = function (name) {
			this.createCookie(name, "", -1);
		}


		return {
			createCookie: createCookie,
			readCookie: readCookie,
			eraseCookie: eraseCookie
		}

}]);