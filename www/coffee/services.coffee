angular.module('starter.services', [])

.factory('Chats', ->
  # Might use a resource here that returns a JSON array
  # Some fake testing data
  chats = [
    {
      id: 0
      name: 'Ben Sparrow'
      lastText: 'You on your way?'
      face: 'img/ben.png'
    }
    {
      id: 1
      name: 'Max Lynx'
      lastText: 'Hey, it\'s me'
      face: 'img/max.png'
    }
    {
      id: 2
      name: 'Adam Bradleyson'
      lastText: 'I should buy a boat'
      face: 'img/adam.jpg'
    }
    {
      id: 3
      name: 'Perry Governor'
      lastText: 'Look at my mukluks!'
      face: 'img/perry.png'
    }
    {
      id: 4
      name: 'Mike Harrington'
      lastText: 'This is wicked good ice cream.'
      face: 'img/mike.png'
    }
  ]
  {
    all: ->
      chats
    remove: (chat) ->
      chats.splice chats.indexOf(chat), 1
      return
    get: (chatId) ->
      i = 0
      while i < chats.length
        if chats[i].id == parseInt(chatId)
          return chats[i]
        i++

      null
  }
)

.factory('Upload', ($q, $cordovaCamera, $cordovaFileTransfer) ->
  { fileTo: (serverURL) ->
    deferred = $q.defer()

    if ionic.Platform.isWebView()
      options =
        quality: 70
        targetWidth: 1000
        targetHeight: 1000
        destinationType: Camera.DestinationType.FILE_URI
        sourceType: Camera.PictureSourceType.CAMERA
        encodingType: Camera.EncodingType.JPEG

      $cordovaCamera.getPicture(options).then ((fileURL) ->
        uploadOptions = new FileUploadOptions
        uploadOptions.fileKey = 'file'
        uploadOptions.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1)
        uploadOptions.mimeType = 'image/jpeg'
        uploadOptions.chunkedMode = false

        $cordovaFileTransfer.upload(serverURL, fileURL, uploadOptions).then ((result) ->
          deferred.resolve result
          return
        ), (err) ->
          deferred.reject err
          return
        return
      ), (err) ->
        deferred.reject err
        return
    else
      deferred.reject 'Uploading not supported in browser'
    deferred.promise
  }
)
