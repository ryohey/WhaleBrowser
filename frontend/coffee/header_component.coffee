React = require "react"
Select = require "./select_component.coffee"

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
  onChangeSortOrder: (e) ->
    @props.onChangeSortOrder e.target.checked

  render: ->
    <div id="header">
      <input type="text" />
      <button>clear</button>
      <Select 
        onChange={@props.onChangeSortColumn} 
        options={keys} />
      <input
          type="checkbox"
          onChange={@onChangeSortOrder}
        />
    </div>
