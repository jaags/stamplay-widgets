appId=$1;

bower install

s3cmd put './pages/layout.html' s3://devcdn.stamplay.com/apps/$appId/pages/

# LIBS

s3cmd put '../bower_components/angular/angular.js' s3://devcdn.stamplay.com/apps/$appId/assets/  
s3cmd put '../bower_components/ng-file-upload/angular-file-upload.js' s3://devcdn.stamplay.com/apps/$appId/assets/ 
s3cmd put '../bower_components/angular-bootstrap/ui-bootstrap-tpls.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../bower_components/ng-file-upload/angular-file-upload-shim.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../bower_components/angular-payments/lib/angular-payments.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../bower_components/accounting.js/accounting.min.js' s3://devcdn.stamplay.com/apps/$appId/assets/


s3cmd put '../module.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../directives/utils/ngName.js' s3://devcdn.stamplay.com/apps/$appId/assets/

# SERVICES

s3cmd put '../services/userService.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../services/photoService.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../services/cookieService.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../services/formService.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../services/loginService.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../services/requestParserService.js' s3://devcdn.stamplay.com/apps/$appId/assets/

# LOGIN DIRECTIVES

s3cmd put '../directives/stamplay.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../directives/login-facebook/login-facebook.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../directives/login-google/login-google.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../directives/login-twitter/login-twitter.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../directives/login-dropbox/login-dropbox.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../directives/login-linkedin/login-linkedin.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../directives/login-instagram/login-instagram.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../directives/login-github/login-github.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../directives/login-angellist/login-angellist.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../directives/login-local/login-local.js' s3://devcdn.stamplay.com/apps/$appId/assets/

# LOGOUT DIRECTIVES

s3cmd put '../directives/logout/logout.js' s3://devcdn.stamplay.com/apps/$appId/assets/

# FORM DIRECTIVES 

s3cmd put '../directives/form-submit/form-submit.js' s3://devcdn.stamplay.com/apps/$appId/assets/

# PHOTO DIRECTIVES

s3cmd put '../directives/photo-upload/photo-upload.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../directives/photo-slideshow/photo-slideshow.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../directives/photo-single/photo-single.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../directives/photo-gallery/photo-gallery.js' s3://devcdn.stamplay.com/apps/$appId/assets/

# USER DIRECTIVES

s3cmd put '../directives/user-signup/user-signup.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../directives/user-badge/user-badge.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../directives/user-navbadge/user-navbadge.js' s3://devcdn.stamplay.com/apps/$appId/assets/

# STRIPE DIRECTIVES

s3cmd put '../directives/stripe-add-card/stripe-add-card.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../directives/stripe-anonymous-payment/stripe-anonymous-payment.js' s3://devcdn.stamplay.com/apps/$appId/assets/
s3cmd put '../directives/stripe-customer-payment/stripe-customer-payment.js' s3://devcdn.stamplay.com/apps/$appId/assets/