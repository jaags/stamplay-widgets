# Whitelist URL missing

A javascript variable named _ASSETS_URL must be attached to the window object for allowing Angular js to whitelist the correct folder URL.

You need to place this variable definition before importing stamplay-ng.min.js.
Here is an example:

`
<script>
	var _ASSETS_URL = {{assetsUrl}};
</script>
<script src="{{assetsUrl}}/assets/stamplay-ng.min.js"></script>
`