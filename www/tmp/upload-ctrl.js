angular.module('starter.controllers')
  .controller('UploadCtrl', function ($scope, Upload) {
    $scope.uploadFile = function () {
      Upload.fileTo(UPLOAD_URL).then(
        function (res) {
          // Success
        }, function (err) {
          // Error
        })
    };
  });
