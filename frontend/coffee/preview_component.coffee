React = require "react"
_u = require "underscore"

json2html = (obj) ->
  if obj instanceof Array
    list = json2html o for o in obj
    <ul>{list}</ul>
  else if obj instanceof Object
    list = ([
      <dt>{key}</dt>
      <dd>{json2html value}</dd>
    ] for key, value of obj)
    <dl>{list}</dl>
  else
    obj.toString()

module.exports = React.createClass 
  getSelectedMovie: ->
    _u.find @props.movies, (m) -> m.isSelected

  render: ->
    movie = @getSelectedMovie()
    unless movie?
      <div id="preview">
        <p>No file selected</p>
      </div>
    else
      <div id="preview">
        <img src={movie.getThumbnailURL()} />
        <p className="name">{movie.movie_name}</p>
        {json2html movie}
      </div>
  