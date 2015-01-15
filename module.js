app = angular.module('app', ['angularFileUpload', 'ui.bootstrap', 'angularPayments']).config(
	function ($sceDelegateProvider) {

		var injectAppId = function (isDev) {
			//Try to understand _APP_ID from url
			var url = window.location.href;
			var index = url.indexOf('.stamplay.com');

			if (index != -1) {
				//I am on Stamplay
				var startIndex, endIndex;
				if (isDev) {
					startIndex = url.indexOf('.stamplay.com') - 10;
					endIndex = url.indexOf('.stamplay.com') - 4;
				} else {
					startIndex = url.indexOf('.stamplay.com') - 6;
					endIndex = url.indexOf('.stamplay.com');
				}

				window._APP_ID = url.substring(startIndex, endIndex);
			} else {
				throw (new Error('window._APP_ID missing'));
			}
		}


		if (window._ASSETS_URL) {
			$sceDelegateProvider.resourceUrlWhitelist(['self', _ASSETS_URL + '/**']);
		} else {
			console.error('Whitelist URL missing , refer to common errors in Github documentation\nhttps://github.com/Stamplay/stamplay-widgets/blob/master/docs/commonErrors.md');

			var isDev = document.location.href.indexOf('stg') != -1;
			var addDev = (isDev) ? 'dev' : '';

			if (!window._APP_ID) {
				injectAppId(isDev);
			}

			console.log('For better performance consider an app deploy and add window._ASSETS_URL={{assetsUrl}}');

			window._ASSETS_URL = 'https://s3-eu-west-1.amazonaws.com/' + addDev + 'cdn.stamplay.com/apps/' + window._APP_ID + '/dev';
			$sceDelegateProvider.resourceUrlWhitelist(['self', _ASSETS_URL + '/**']);

		}
	});