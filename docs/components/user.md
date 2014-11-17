User widgets
==================

A set of widgets related to the user component. Available angular directives are:
* [user-badge](#user-badge)
*	[user-navbadge](#user-navbadge)
* [user-signup](#user-signup)

## User badge
#### Configuration
This widget doesn't require any additional configuration.
 
You can insert it in the page by adding this code snippet in the page:  

	<stamplay user-badge></stamplay>

#### What you'll get
* If the user isn't logged you'll see nothing.
* If the user is logged you'll see the user's profile image (user.profileImg) and a link for the logout.  

## User navbadge
#### Configuration
This widget doesn't require any additional configuration.

You can insert it in the page by adding this code snippet in the page: 
 
	<stamplay user-navbadge></stamplay>

#### What you'll get
* If the user isn't logged you'll see nothing.
* If the user is logged you'll see a dropdown menu with the user's profile image (user.profileImg) and a nested menu item for the logout.   

## User signup
#### Configuration
This widget doesn't require any additional configuration.

You can insert it in the page by adding this code snippet in the page:  

	<stamplay user-signup></stamplay>

#### What you'll get
* If the user *is* logged you'll see nothing.
* If the user is logged you'll get a basic registration form that will allow your users to signup asking for:
	*  a valid email
	*  a password of length at least six characters
	*  password repeat
 
When a user signs up it will be automatically logged in and all the widgets in the page will be notified that the user is logged.