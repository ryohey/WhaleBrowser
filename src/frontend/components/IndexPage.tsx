import { observer } from "mobx-react"
import { useEffect } from "react"

import { useStores } from "../hooks/useStores"
import Header from "./Header"
import MovieList from "./MovieList"
import MovieSearchBar from "./MovieSearchBar"
import PreviewComponent from "./Preview"

const IndexPage = () => {
  const { movieStore, navStore } = useStores()
  const { movies } = movieStore

  useEffect(() => {
    movieStore.loadMore()
  }, [])

  const onClickMovie = (movie) => {
    movieStore.select(movie)
  }

  const onDoubleClickMovie = (movie) => {
    // TODO: Move to main process
    // child_process.exec(`explorer ${movie.movie_path}`)
  }

  const onClickMenuDelete = (movie) => {
    movieStore.delete(movie)
  }

  return (
    <div className="IndexPage">
      <Header onClickMenuButton={() => (navStore.isDrawerOpened = true)}>
        <MovieSearchBar
          searchText={movieStore.searchText}
          sortColumn={movieStore.sortColumn}
          sortOrder={movieStore.sortOrder}
          onChangeSearchText={(t) => movieStore.setSearchText(t)}
          onChangeSortColumn={(c) => movieStore.setSortColumn(c)}
          onChangeSortOrder={(d) => movieStore.setSortOrder(d)}
        />
      </Header>
      <div className="content">
        <MovieList
          movies={movies}
          onClickMovie={onClickMovie}
          onDoubleClickMovie={onDoubleClickMovie}
          onClickMenuDelete={onClickMenuDelete}
          loadMore={() => movieStore.loadMore()}
        />
        <PreviewComponent movies={movies} />
      </div>
    </div>
  )
}

export default observer(IndexPage)
