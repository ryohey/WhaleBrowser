import { InView } from "react-intersection-observer"
import MovieComponent from "./Movie"

export default function MovieList(props) {
  const {
    movies,
    onClickMovie,
    onDoubleClickMovie,
    onClickMenuDelete,
    loadMore,
  } = props

  const renderMovies = () => {
    return movies.map((movie) => {
      return (
        <MovieComponent
          movie={movie}
          key={movie.movie_id}
          onClick={() => onClickMovie(movie)}
          onDoubleClick={() => onDoubleClickMovie(movie)}
          onClickMenuDelete={() => onClickMenuDelete(movie)}
        />
      )
    })
  }

  return (
    <div className="MovieList">
      {renderMovies()}
      <InView onChange={loadMore} threshold={0.2} />
    </div>
  )
}
