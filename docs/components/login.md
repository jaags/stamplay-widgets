Login widgets
==================

A set of widgets related to the login component. Available angular directives are:
* [login-angelist](#external-service-login)
* [login-dropbox](#external-service-login)
* [login-facebook](#external-service-login)
* [login-github](#external-service-login)
* [login-google](#external-service-login)
* [login-instagram](#external-service-login)
* [login-linkedin](#external-service-login)
* [login-local](#login-local)
* [login-twitter](#external-service-login)

## external-service login
#### Configuration
All external logins are handled the same way and don't require any additional configuration. 
To be thorough here is a list of all the supported login services:

	<stamplay login-angelist></stamplay>   
	<stamplay login-dropbox></stamplay>
	<stamplay login-facebook></stamplay>
	<stamplay login-github></stamplay>
	<stamplay login-google></stamplay>
	<stamplay login-instagram></stamplay>
	<stamplay login-linkedin></stamplay>
	<stamplay login-twitter></stamplay>

If you need to redirect you users after a successfull login you can use the redirect data attribute:

	<stamplay login-service data-redirect="/page" ></stamplay>


#### What you'll get
* If the user is logged you'll see nothing.
* If the user isn't logged you'll see a standard Bootstrap button that will allow your user to log in with the specified service.  

## Login local
#### Configuration
This widget doesn't require any additional configuration.

You can insert it in the page by adding this code snippet in the page: 
 
	<stamplay login-local></stamplay>

#### What you'll get
* If the user is logged you'll see nothing.
* If the user isn't logged you'll see a form with email and password that your user will need to complete for signin in.

When a user signs in all the widgets in the page will be notified that the user is logged.