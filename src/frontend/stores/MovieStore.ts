import { action, observable } from "mobx"

export default class MovieStore {
  @observable movies = []
  @observable isLoading = false
  @observable searchText = ""
  @observable sortColumn = "movie_id"
  @observable sortOrder = false
  thumbnailSize
  dbFile
  db

  constructor(thumbnailSize) {
    this.thumbnailSize = thumbnailSize
  }

  add(filePath) {
    // TODO: fetch
  }

  setDatabasePath(file) {
    // TODO: fetch
    this.update()
  }

  setMovies(movies) {
    this.movies = movies
  }

  clear() {
    this.movies = []
  }

  update() {
    this.movies = []
    this.loadMore()
  }

  async loadMore() {
    if (!this.db || this.isLoading) {
      return
    }

    this.isLoading = true

    // TODO
    // const res = await fetch(`/movies/`)
    // const movies = await res.json()
    // this.setMovies(this.movies.concat(movies))
    // this.isLoading = false
  }

  @action select(movie) {
    this.setMovies(
      this.movies.map((m) => {
        m.isSelected = m.movie_id === movie.movie_id
        return m
      })
    )
  }

  async delete(movie) {
    // TODO
    // await fetch(`movie/...`, { method: "DELETE " })
  }

  updateField(name, value) {
    if (this[name] === value) {
      return
    }
    this[name] = value
    this.update()
  }

  setSearchText(t) {
    this.updateField("searchText", t)
  }
  setSortColumn(c) {
    this.updateField("sortColumn", c)
  }
  setSortOrder(d) {
    this.updateField("sortOrder", d)
  }
  setThumbnailSize(s) {
    this.updateField("thumbnailSize", s)
  }
}
