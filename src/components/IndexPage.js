const { remote } = window.require("electron")
const child_process = remote.require("child_process")

import React, { Component, useEffect } from "react"
import { observer, inject } from "mobx-react"

import MovieList from "./MovieList"
import PreviewComponent from "./Preview"
import Header from "./Header"
import MovieSearchBar from "./MovieSearchBar"
import { useStores } from "../hooks/useStores"

const IndexPage = () => {
  const { movieStore, navStore } = useStores()
  const { movies } = movieStore

  useEffect(() => {
    movieStore.loadMore()
  }, [])

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
    <Header
      onClickMenuButton={() => navStore.isDrawerOpened = true}>
      <MovieSearchBar
        searchText={movieStore.searchText}
        sortColumn={movieStore.sortColumn}
        sortOrder={movieStore.sortOrder}
        onChangeSearchText={t => movieStore.setSearchText(t)}
        onChangeSortColumn={c => movieStore.setSortColumn(c)}
        onChangeSortOrder={d => movieStore.setSortOrder(d)}
      />
    </Header>
    <div className="content">
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

export default IndexPage
