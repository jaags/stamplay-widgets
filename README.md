stamplay-widgets
==================

A set of basic widgets to create web applications using Stamplay APIs

* [User](./docs/components/user.md)
* [Login](./docs/components/login.md) 
* [Logout](./docs/components/logout.md)
* [Form](./docs/components/form.md) 
* [Photo](./docs/components/photo.md)
* [Stripe](./docs/components/stripe.md)

-----------------------

## Using the widgets
For using the widgets in your Stamplay application you need to follow this steps:  
 
* Build the widgets
* Upload the dist folder in the assets folder
* Add the ng-app="app" attribute to the body
* Add the widgets' tag in your page 

### Building all widgets 
In the root repository folder launch from the terminal:
 
	bower install && sudo npm install && grunt build

It will minify the javascript and will copy the widget template in the dist folder. 
### Upload in the assets folder
Using Stamplay Sync or via editor upload the files in the dist error in the assets folder.
