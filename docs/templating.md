# Custom templates
You can use a custom template for every directive by using the `data-template-url` attribute.
	
	<stamplay 
		stripe-anonymous-payment
		data-template-url="new-template.html" 
		data-key="pk_x" 
		data-amount="x" 
		data-currency="y">
	</stamplay>

In this way the directive will user the file in the assets folder named "new-template.html"

# Custom modal templates
For widgets that use modals you can specify a custom template:

	<stamplay 
		stripe-anonymous-payment
		data-template-url="new-template.html"
		data-template-url-modal="new-template.html" 
		data-key="pk_x" 
		data-amount="x" 
		data-currency="y">
	</stamplay>    
   