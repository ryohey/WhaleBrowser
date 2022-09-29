import { action, makeObservable, observable } from "mobx"

const baseURL = "http://localhost:3000"

export default class MovieStore {
  movies = []
  isLoading = false
  searchText = ""
  sortColumn = "movie_id"
  sortOrder = false
  thumbnailSize
  dbFile
  db

  constructor(thumbnailSize) {
    this.thumbnailSize = thumbnailSize

    makeObservable(this, {
      movies: observable,
      isLoading: observable,
      searchText: observable,
      sortColumn: observable,
      sortOrder: observable,
      select: action,
    })
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
    if (this.isLoading) {
      return
    }

    this.isLoading = true
    const params = new URLSearchParams({
      offset: this.movies.length.toString(),
      searchText: this.searchText,
      sortColumn: this.sortColumn,
      descend: this.sortOrder.toString(),
      limit: (50).toString(),
    })
    const res = await fetch(`${baseURL}/movies/?${params.toString()}`)
    const movies = await res.json()
    this.setMovies(this.movies.concat(movies))
    this.isLoading = false
  }

  select(movie) {
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
