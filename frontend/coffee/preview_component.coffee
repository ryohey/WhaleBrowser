React = require "react"
_u = require "underscore"

json2html = (obj) ->
  if obj instanceof Array
    list = (for o in obj
      json2html o
    )
    <ul>
      {list}
    </ul>
  else if obj instanceof Object
    list = (for key, value of obj
      [
        <dt>{key}</dt>
        <dd>{json2html value}</dd>
      ]
    )
    
    <dl>
      {list}
    </dl>
  else
    obj.toString()

module.exports = React.createClass 
  getSelectedMovie: ->
    _u.find @props.movies, (m) -> m.isSelected

  render: ->
    movie = @getSelectedMovie()
    unless movie?
      <div id="preview">
        <p>"File is not selected"</p>
      </div>
    else
      <div id="preview">
        <img src={movie.getThumbnailURL()} />
        <p className="name">{movie.movie_name}</p>
        {json2html movie}
      </div>
  