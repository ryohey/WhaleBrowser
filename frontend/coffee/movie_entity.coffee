module.exports = class
  getThumbnailPath: ->
    fileName = "#{@movie_name}.\##{@hash}.jpg"
    "#{@thumbnailDir}#{fileName}"

  getThumbnailURL: ->
    fileName = encodeURIComponent "#{@movie_name}.\##{@hash}.jpg"
    "file://#{@thumbnailDir}#{fileName}?t=#{@isThumbnailCreated}"
