import React from "react"
import _ from "lodash"

function json2html(obj) {
  if (obj instanceof Array) {
    const list = _.values(obj).map(o => json2html(o))
    return <ul>{list}</ul>
  } else if (obj instanceof Object) {
    const list = _.entries(obj, e => [
      <dt>{e[0]}</dt>,
      <dd>{json2html(e[1])}</dd>
    ])
    return <dl>{list}</dl>
  }
  return obj.toString()
}

export default function PreviewComponent(props) {
  function getSelectedMovie() {
    return _.find(props.movies, m => m.isSelected)
  }

  const movie = getSelectedMovie()
  if (!movie) {
    return <div id="preview">
      <p>No file selected</p>
    </div>
  } else {
    return <div id="preview">
      <img src={movie.getThumbnailURL()} />
      <p className="name">{movie.movie_name}</p>
      {json2html(movie)}
    </div>
  }
}
