Stripe widgets
==================

A set of widgets related to the Stripe component. Available angular directives are:
*	[stripe-anonymous-payment](#stripe-anonymous-payment)
* [stripe-add-card](#stripe-add-card)
* [stripe-customer-payment](#stripe-customer-payment)

## Stripe anonymous payment
#### Configuration
This widget need the following data attributes:
* data-amount : the amount *in cents* that must be payed.   
* data-currency : the currency of the transaction. It must be one of the following: USD, GBP, EUR.
* data-key: the publishable key of your Stripe account. If the component is in live mode set the live publishable key otherwise use the test key.
 
You can insert it by adding this code snippet in the page:  

	<stamplay stripe-anonymous-payment data-key="pk_x" data-amount="x" data-currency="y"></stamplay>

#### What you'll get
This widget will allow your users to pay even if they aren't registered or logged. 

## Stripe add card
#### Configuration
This widget need the following data attributes:
* data-key : the publishable key of your Stripe account. If the component is in live mode set the live publishable key otherwise use the test key. This will be used to send the credit card information to Stripe and get the card token.     

You can insert it by adding this code snippet in the page: 
 
	<stamplay data-key="pk_x"></stamplay>

#### What you'll get
* If the user isn't logged you'll see nothing.
* If the user is logged you'll see a button that will open a modal for letting the user add the credit card information.   

## Stripe customer payment
#### Configuration
This widget need the following data attributes:
* data-amount : the amount *in cents* that must be payed.   
* data-currency : the currency of the transaction. It must be one of the following: USD, GBP, EUR.
* data-key: the publishable key of your Stripe account. If the component is in live mode set the live publishable key otherwise use the test key.

You can insert it by adding this code snippet in the page:  

	<stamplay stripe-customer-payment data-key="pk_x" data-amount="x" data-currency="y"></stamplay>

#### What you'll get
* If the user isn't logged you'll see nothing.
* If the user is logged your users will be able to pay through a payment modal. 
 
