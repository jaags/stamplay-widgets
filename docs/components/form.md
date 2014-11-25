Form widgets
==================

A set of widgets related to the form component. Available angular directives are:
* [form-submit](#form-submit)

## Form submit
#### Configuration
This widget need a data attribute named form-id that will specify the form to be displayed. You can retrieve the form id from the [Editor](https://editor.stamplay.com).
 
You can insert it in the page by adding this code snippet in the page:  

	<stamplay form-submit data-form-id="YOUR-FORM-ID"></stamplay>

#### What you'll get
There are two use cases are handled:
* [form can be submitted by only logged user](#only-logged-users-restriction)
* [form can be submitted from everyone](#no-restriction)

##### Only logged users restriction
* If user isn't logged a nice sign in warning will be displayed.
* If user is logged the form will show up and can be submitted, if  user has already anwsered and one entry per user is on, he will be notified only after the form has been submitted (we're aware of it)

##### No restriction
* All users will see the form and will be able to submit it.