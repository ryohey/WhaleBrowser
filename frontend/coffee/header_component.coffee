React = require "react"

keys = [
  "movie_id"
  "movie_name"
  "movie_path"
  "movie_length"
  "movie_size"
  "last_date"
  "file_date"
  "regist_date"
  "score"
  "view_count"
  "hash"
  "container"
  "video"
  "audio"
  "extra"
  "title"
  "artist"
  "album"
  "grouping"
  "writer"
  "genre"
  "track"
  "camera"
  "create_time"
  "kana"
  "roma"
  "tag"
  "comment1"
  "comment2"
  "comment3"
]

module.exports = React.createClass 
  render: ->
    options = (for key in keys
      <option>{key}</option>
    )
    <div id="header">
      <input type="text" />
      <button>clear</button>
      <select>{options}</select>
    </div>
