const { remote } = window.require("electron")
const child_process = remote.require("child_process")

import React, { Component } from "react"
import { observer, inject } from "mobx-react"

import MovieList from "./MovieList"
import PreviewComponent from "./Preview"
import HeaderComponent from "./Header"

@inject("movieStore", "navStore") @observer
class IndexPage extends Component {
  componentDidMount() {
    this.props.movieStore.loadMore()
  }

  render() {
    const { movieStore, navStore } = this.props
    const { movies } = movieStore

    const onClickMovie = movie => {
      movieStore.select(movie)
    }

    const onDoubleClickMovie = (movie) => {
      child_process.exec(`explorer ${movie.movie_path}`)
    }

    const onClickMenuDelete = (movie) => {
      movieStore.delete(movie)
    }

    return <div className="IndexPage">
      <HeaderComponent
        onChangeSearchText={t => movieStore.setSearchText(t)}
        onChangeSortColumn={c => movieStore.setSortColumn(c)}
        onChangeSortOrder={d => movieStore.setSortDescend(d)}
        onClickMenuButton={() => navStore.isDrawerOpened = true} />
      <div className="flex">
        <MovieList
          movies={movies}
          onClickMovie={onClickMovie}
          onDoubleClickMovie={onDoubleClickMovie}
          onClickMenuDelete={onClickMenuDelete}
          loadMore={() => movieStore.loadMore()} />
        <PreviewComponent movies={movies} />
      </div>
    </div>
  }
}

export default IndexPage
