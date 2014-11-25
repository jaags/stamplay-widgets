app = angular.module('app', ['angularFileUpload', 'ui.bootstrap', 'angularPayments']).config(
	function ($sceDelegateProvider) {
		/* Since templates are on AWS S3 we load templates from http whitelisting the assets URL */
		var isDev = document.location.href.indexOf('stg') != -1;
		var addDev = (isDev) ? 'dev' : '';
		var baseUrl = 'https://s3-eu-west-1.amazonaws.com/' + addDev + 'cdn.stamplay.com/apps/';
		$sceDelegateProvider.resourceUrlWhitelist(['self', baseUrl + _APP_ID + '/assets/**']);
	});