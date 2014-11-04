Photo widgets
==================

A set of widgets related to the photo component. Available angular directives are:
* [photo-gallery](#photo-gallery)
* [photo-single](#photo-single)
* [photo-slideshow](#photo-slideshow)
* [photo-upload](#photo-upload)

## Photo gallery
#### Configuration
This widget need the following data attributes:
* album-id : the album id of the gallery (default: default)
* photo-single-url : this have to be a valid url and it should point to a page where is present the photo-single widget.   
* per-page : a pagination parameter that represents how many photos should be displayed for every page  

You can insert it in the page by adding this code snippet in the page:  

	<stamplay photo-gallery data-album-id="YOUR-ALBUM-ID" data-photo-single-url="YOUR-URL" data-per-page="YOUR-NUMBER-PER-PAGE" ></stamplay>


#### What you'll get
This widget will show a simple photo gallery with pagination options. 

## Photo single
#### Configuration
This widget need the following data attributes:
* rate : a boolean value that will describe if a rating system should be available for the photo (default: true) 
* vote : a boolean value that will describe if a "like" system should be available for the photo (default: false)   

Moreover this widget will read the _id of the photo to be displayed from the query string from an attribute called photo-id. 

	 https://appid.stamplay.com/my-photo?photo-id=<photo-resource-id>

You can insert it in the page by adding this code snippet in the page:  

	<stamplay photo-gallery data-photo-single-url="YOUR-URL" data-per-page="YOUR-NUMBER-PER-PAGE" ></stamplay>


#### What you'll get
This widget will display the photo with the _id read in the url and will allow users to comment, rate and vote the resource. 

## Photo slideshow
#### Configuration
This widget need the following data attributes:
* album-id : the album id of the gallery 

You can insert it in the page by adding this code snippet in the page:  

	<stamplay photo-slideshow data-album-id="YOUR-ALBUM-ID"></stamplay>

#### What you'll get
This widget will display with a slideshow effect the lastest 10 photo of the specified album-id.

## Photo upload
#### Configuration
This widget need the following data attributes:
* album-id : the album id of the gallery (default: default) 

You can insert it in the page by adding this code snippet in the page:  

	<stamplay photo-slideshow data-album-id="YOUR-ALBUM-ID"></stamplay>

#### What you'll get
* If the user isn't logged you'll see nothing.
* If the user isn logged you'll see an upload button that will show the photo preview and the upload status. A feedback message of success or error is shown upon completion.
