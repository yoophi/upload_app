angular.module('starter.controllers', [])

.controller('DashCtrl', ($scope) ->
)

.controller('ChatsCtrl', ($scope, Chats) ->
  # With the new view caching in Ionic, Controllers are only called
  # when they are recreated or on app start, instead of every page change.
  # To listen for when this page is active (for example, to refresh data),
  # listen for the $ionicView.enter event:
  #
  #$scope.$on('$ionicView.enter', function(e) {
  #});
  $scope.chats = Chats.all()

  $scope.remove = (chat) ->
    Chats.remove chat
    return

  return
)

.controller('ChatDetailCtrl', ($scope, $stateParams, Chats) ->
  $scope.chat = Chats.get($stateParams.chatId)
  return
)

.controller('AccountCtrl', ($scope) ->
  $scope.settings = enableFriends: true
  return
)

.controller('UploadCtrl', ($scope, Upload) ->
  $scope.uploadFile = ->
    UPLOAD_URL = 'http://yoophi.com/upload.php'
    Upload.fileTo(UPLOAD_URL).then ((res) ->
      # Success
      console.log 'res', res
      return
    ), (err) ->
      # Error
      console.log 'error', err
      return
    return
  return
)
