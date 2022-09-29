function timeString(seconds) {
  if (seconds < 0) return ""
  const hou = Math.floor(seconds / 60 / 60)
  const hh = hou > 0 ? `${hou}時間` : ""
  seconds -= hou * 60 * 60

  const min = Math.floor(seconds / 60)
  const mm = min > 0 ? `${min}分` : ""
  seconds -= min * 60

  const ss = `${seconds}秒`
  return `${hh}${mm}${ss}`
}

export default function Movie(props) {
  const onContextMenu = (e) => {
    e.preventDefault()
    // TODO: Fix
    // showMovieContextMenu(props.movie, props)
  }

  const className = props.movie.isSelected ? "selected" : ""

  return (
    <div
      className={`movie ${className}`}
      onClick={props.onClick}
      onDoubleClick={props.onDoubleClick}
      onContextMenu={onContextMenu}
    >
      <div className="image">
        <img src={props.movie.thumbnail} />
      </div>
      <p className="name">{props.movie.movie_name}</p>
      <p className="time">{timeString(props.movie.movie_length)}</p>
    </div>
  )
}
