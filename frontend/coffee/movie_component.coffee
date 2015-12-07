React = require "react"

timeString = (seconds) ->
  return "" if seconds < 0
  hou = Math.floor(seconds / 60 / 60)
  hh = if hou > 0 then "#{hou}時間" else ""
  seconds -= hou * 60 * 60

  min = Math.floor(seconds / 60)
  mm = if min > 0 then "#{min}分" else ""
  seconds -= min * 60

  ss = "#{seconds}秒"
  "#{hh}#{mm}#{ss}"

module.exports = React.createClass 
  render: ->
    className = if @props.movie.isSelected then "selected" else ""
    <div 
      className="movie #{className}"
      onClick={@props.onClick}
      onDoubleClick={@props.onDoubleClick}>
      <div className="image">
        <img src={@props.movie.getThumbnailURL()} />
      </div>
      <p className="name">{@props.movie.movie_name}</p>
      <p className="time">{timeString @props.movie.movie_length}</p>
    </div>
