angular.module('starter.services')
  .factory('Upload', function ($q, $cordovaCamera, $cordovaFileTransfer) {
    return {
      fileTo: function (serverURL) {
        var deferred = $q.defer();

        if (ionic.Platform.isWebView()) {
          var options = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: Camera.EncodingType.JPEG
          };

          $cordovaCamera.getPicture(options).then(
            function (fileURL) {
              var uploadOptions = new FileUploadOptions();
              uploadOptions.fileKey = "file";
              uploadOptions.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
              uploadOptions.mimeType = "image/jpeg";
              uploadOptions.chunkedMode = false;

              $cordovaFileTransfer.uploadFile(serverURL, fileURL, uploadOptions).then(
                function (result) {
                  deferred.resolve(result);
                }, function (err) {
                  deferred.reject(err);
                });
            }, function (err) {
              deferred.reject(err);
            })
        } else {
          deferred.reject('Uploading not supported in browser');
        }

        return deferred.promise;
      }
    }
  });
