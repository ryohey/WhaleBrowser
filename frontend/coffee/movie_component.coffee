React = require "react"

module.exports = React.createClass 
  render: ->
    className = if @props.movie.selected then "selected" else ""
    <div 
      className="movie #{className}"
      onClick={@props.onClick}
      onDoubleClick={@props.onDoubleClick}>
      <img src={"#{@props.movie.getThumbnailURL()}?t=#{@props.movie.isThumbnailCreated}"} />
      <p className="name">{@props.movie.movie_name}</p>
    </div>
