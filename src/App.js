// builtin modules

const { remote } = window.require("electron")
const child_process = remote.require("child_process")
import React, { Component } from "react"

// additional modules

import Waypoint from "react-waypoint"

// components

import MovieComponent from "./MovieComponent"
import PreviewComponent from "./PreviewComponent"
import HeaderComponent from "./HeaderComponent"
import withMovies from "./withMovies"

import "../sass/main.sass"

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.movieStore.loadMore()
  }

  render() {
    const movies = this.props.movies
    const movieStore = this.props.movieStore

    const onClickMovie = movie => {
      movieStore.select(movie)
    }

    const onDoubleClickMovie = (movie) => {
      child_process.exec(`explorer ${movie.movie_path}`)
    }

    const onClickMenuDelete = (movie) => {
      movieStore.delete(movie)
    }

    const renderMovies = () => {
      return movies.map(movie => {
        return <MovieComponent
          movie={movie}
          key={movie.movie_id}
          onClick={() => onClickMovie(movie)}
          onDoubleClick={() => onDoubleClickMovie(movie)}
          onClickMenuDelete={() => onClickMenuDelete(movie)} />
      })
    }

    return <div id="app">
      <HeaderComponent
        onChangeSearchText={t => movieStore.setSearchText(t)}
        onChangeSortColumn={c => movieStore.setSortColumn(c)}
        onChangeSortOrder={d => movieStore.setSortDescend(d)} />
      <div className="flex">
        <div id="movies">
          {renderMovies()}
          <Waypoint
            onEnter={() => movieStore.loadMore()}
            onLeave={() => {}}
            threshold={0.2} />
        </div>
        <PreviewComponent movies={movies} />
      </div>
    </div>
  }
}

export default withMovies(App)
