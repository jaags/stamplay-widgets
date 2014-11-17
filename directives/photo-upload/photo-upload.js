/* You can use this directive with the following tag <stamplay login-instagram></stamplay> */
app.directive('photoUpload', ['userService', '$upload',

	function (userService, $upload) {
		var templateUrl = _ASSETS_URL + '/assets/photo-upload.html';

		return {
			require: '^stamplay',
			scope: {},
			templateUrl: function (elem, attrs) {
				var _url = _ASSETS_URL + '/assets/';
				return (attrs.templateUrl) ? _url + attrs.templateUrl : _url + 'photo-upload.html';
			},

			link: function (scope, element, attrs, parentController) {
				scope.user = userService.getUser();
				parentController.listenOnUser(scope);
				scope.albumId = attrs.albumId || 'default';
				scope.fileReaderSupported = window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false);
				scope.dataUrls = [];
				scope.selectedFiles = [];
				scope.progress = [];
				scope.typeError = false;
			},

			controller: function ($scope, $timeout) {

				$scope.onFileSelect = function ($files) {
					$scope.typeError = false;
					$scope.dataUrls = [];
					$scope.selectedFiles = $files;

					//$files: an array of files selected, each file has name, size, and type.
					for (var i = 0; i < $files.length; i++) {
						var file = $files[i];

						if (file.type.indexOf('image') === -1) {
							$scope.dataUrls = [];
							$scope.selectedFiles = [];
							$scope.typeError = true;
							return;
						}

						if ($scope.fileReaderSupported && file.type.indexOf('image') > -1) {
							var fileReader = new FileReader();
							fileReader.readAsDataURL($files[i]);
							var loadFile = function (fileReader, index) {
								fileReader.onload = function (e) {
									$timeout(function () {
										$scope.dataUrls[index] = e.target.result;
									});
								}
							}(fileReader, i);
						};

						var toBeSent = {
							url: 'api/photo/v0/photos',
							method: 'POST',
							//headers: {'header-key': 'header-value'},
							//withCredentials: true,

							data: {
								files: file,
								albumName: $scope.albumId
							},
							//file: file, // or list of files ($files) for html5 only
							//fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
							// customize file formData name ('Content-Disposition'), server side file variable name. 
							//fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
							// customize how data is added to formData. See #40#issuecomment-28612000 for sample code
							//formDataAppender: function(formData, key, val){}
						};
						if ($scope.user && $scope.user.dt_create) {
							toBeSent.data.userId = $scope.user._id
						}

						$scope.upload = $upload.upload(toBeSent)
							.progress(function (evt) {
								var progressInPercent = parseInt(100.0 * evt.loaded / evt.total);
								$scope.progress[0] = progressInPercent;

								// console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
							}).success(function (data, status, headers, config) {
								// file is uploaded successfully
								console.log(data);
								$scope.uploadSuccessfull = true;
							});

					};
				}
			}
		}
		}]);