app.factory('requestParserService', ['$http',
	function ($http) {

		var _parseLink =  function(parts, link) {

      for (var i = 0; i < parts.length; i++) {
        var section = parts[i].split(';');
        if (section.length != 2) {
          throw new Error("section could not be split on ';'");
        }
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var name = section[1].replace(/rel="(.*)"/, '$1').trim();
        if (url.indexOf('&sort=') < 0) {
          url += '&sort=-dt_create';
        }
        link[name] = url;
      }
    };

		var _getQueryParameter = function(_url, _name){
  	  var result = decodeURI((RegExp('[?|&]' + _name + '=' + '(.+?)(&|$)').exec(_url) || [, null])[1]);
			return (result === "null") ? null : result;
  	};

		return {
			parseLink : _parseLink,
			getQueryParameter : _getQueryParameter
		}

}]);