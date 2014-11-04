module.exports = {

	options: {
		// Tells if ngAnnotate should add annotations (true by default).
		add: true,

		// Tells if ngAnnotate should remove annotations (false by default).
		remove: false,

		// If provided, only strings matched by the regexp are interpreted as module
		// names. You can provide both a regular expression and a string representing
		// one. See README of ng-annotate for further details:
		// https://npmjs.org/package/ng-annotate
		// regexp: regexp,

		// Switches the quote type for strings in the annotations array to single
		// ones; e.g. '$scope' instead of "$scope" (false by default).
		singleQuotes: false,

		// If ngAnnotate supports a new option that is not directly supported via
		// this grunt task yet, you can pass it here. These options gets merged
		// with the above specific to ngAnnotate. Options passed here have lower
		// precedence to the direct ones described above.
		ngAnnotateOptions: {},
	},

	js: {

		files: {
			'./dist/stamplay-ng.js': [
 // LIBS

				'./bower_components/angular/angular.js',
				'./bower_components/ng-file-upload/angular-file-upload.js',
				'./bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
				'./bower_components/ng-file-upload/angular-file-upload-shim.js',

				'./module.js',

				'./directives/utils/ngName.js',

 // SERVICES

				'./services/userService.js',
				'./services/photoService.js',
				'./services/cookieService.js',
				'./services/formService.js',
				'./services/loginService.js',
				'./services/requestParserService.js',

 // DIRECTIVES

				'./directives/stamplay.js',

 // LOGIN DIRECTIVES

				'./directives/login-facebook/login-facebook.js',

        './directives/login-google/login-google.js',

        './directives/login-twitter/login-twitter.js',

        './directives/login-dropbox/login-dropbox.js',

        './directives/login-linkedin/login-linkedin.js',

        './directives/login-instagram/login-instagram.js',

        './directives/login-github/login-github.js',

        './directives/login-angellist/login-angellist.js',

        './directives/login-local/login-local.js',

 // LOGOUT DIRECTIVES

        './directives/logout/logout.js',

 // FORM DIRECTIVES

        './directives/form-submit/form-submit.js',

 // PHOTO DIRECTIVES

        './directives/photo-upload/photo-upload.js',

        './directives/photo-slideshow/photo-slideshow.js',

        './directives/photo-single/photo-single.js',

        './directives/photo-gallery/photo-gallery.js',

 // USER DIRECTIVES

        './directives/user-signup/user-signup.js',

        './directives/user-badge/user-badge.js',

        './directives/user-navbadge/user-navbadge.js'
			]
		}
	}
};