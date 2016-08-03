angular.module('starter.services', [])

  .factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  })

  .factory('Upload', function ($q, $cordovaCamera, $cordovaFileTransfer) {
    return {
      fileTo: function (serverURL) {
        var deferred = $q.defer();

        if (ionic.Platform.isWebView()) {
          var options = {
            //quality: 100,
            quality: 70,
            targetWidth: 1000, //what widht you want after capaturing
            targetHeight: 1000,

            destinationType: Camera.DestinationType.FILE_URI,
            //sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            sourceType : Camera.PictureSourceType.CAMERA,

            encodingType: Camera.EncodingType.JPEG
          };

          $cordovaCamera.getPicture(options).then(
            function (fileURL) {
              var uploadOptions = new FileUploadOptions();
              uploadOptions.fileKey = "file";
              uploadOptions.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
              uploadOptions.mimeType = "image/jpeg";
              uploadOptions.chunkedMode = false;
              console.log('1', uploadOptions.fileName);
              console.log('serverURL', serverURL);

              $cordovaFileTransfer.upload(serverURL, fileURL, uploadOptions).then(
                function (result) {
                  console.log('2', result);
                  deferred.resolve(result);
                }, function (err) {
                  //console.log('2', err);
                  console.log('2', JSON.stringify(err));
                  deferred.reject(err);
                });
            }, function (err) {
              console.log('3', err);
              deferred.reject(err);
            })
        } else {
          console.log('4');
          deferred.reject('Uploading not supported in browser');
        }

        return deferred.promise;
      }
    }
  });

