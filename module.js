app = angular.module('app', ['angularFileUpload', 'ui.bootstrap', 'angularPayments']).config(
	function ($sceDelegateProvider) {
		/* Since templates are on AWS S3 we load templates from http whitelisting the assets URL */
		if (!window._ASSETS_URL) {
			throw (new Error('Whitelist URL missing , refer to common errors in Github documentation\nhttps://github.com/Stamplay/stamplay-widgets/blob/master/docs/commonErrors.md'));
		} else {
			$sceDelegateProvider.resourceUrlWhitelist(['self', _ASSETS_URL + '/**']);

		}
	});