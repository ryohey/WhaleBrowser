import observable from "riot-observable"
import Database from "./Database"
import Query from "./Query"
import createThumbnail from "./stm"
import MovieEntity from "./MovieEntity"
import _ from "lodash"
import path from "path"
const { remote } = window.require("electron")
const fs = remote.require("fs")

function createMovieEntities(rows, thumbnailDir) {
  return rows.map(r =>
    _.create(MovieEntity.prototype, {
      thumbnailDir: thumbnailDir,
      ...r
    })
  )
}

function createThumbnailDir(dbFile, { width, height, column, row }) {
  const dir = path.dirname(dbFile)
  const dbName = path.parse(dbFile).name
  const baseDir = path.join(dir, "thum", dbName)
  return path.join(baseDir, `${width}x${height}x${column}x${row}`)
}

function createThumbnailIfNeeded(movie, callback) {
  const thumbnailPath = movie.getThumbnailPath()
  fs.exists(thumbnailPath, (exists) => {
    if (exists) return
    createThumbnail({
      input: movie.movie_path,
      output: `#{movie.thumbnailDir}*.jpg`,
      addHash: true
    }, error => {
      if (error) {
        console.error(`failed to create the thumbnail for ${movie.movie_name}`, error)
        return
      }
      console.log(`created the thumbnail for ${movie.movie_name}`)
      movie.isThumbnailCreated = true
      callback()
    })
  })
}

export default class MovieStore {
  constructor(dbFile, thumbnailSize) {
    this.movies = []
    this.searchText = ""
    this.sortColumn = "movie_id"
    this.sortDescend = false

    this.thumbnailSize = thumbnailSize
    this.setDatabasePath(dbFile)

    observable(this)
  }

  setDatabasePath(file) {
    if (file === this.dbFile) {
      return
    }
    if (this.db) {
      this.db.close(error => {
        if (error) { console.error(error) }
      })
    }
    this.dbFile = file
    this.db = new Database(file)
  }

  get thumbnailDir() {
    return createThumbnailDir(this.dbFile, this.thumbnailSize)
  }

  setMovies(movies) {
    this.movies = movies
    this.emitChanges()
  }

  clear() {
    this.movies = []
    this.emitChanges()
  }

  emitChanges() {
    this.trigger("change")
  }

  onChange(callback) {
    this.on("change", () => callback(this.movies))
  }

  update() {
    this.movies = []
    this.loadMore()
  }

  loadMore() {
    if (!this.db || this.isLoading) {
      return
    }

    const q = Query.select(
      this.searchText,
      this.sortColumn,
      this.movies.length,
      this.sortDescend)

    this.isLoading = true

    this.db.selectAll(q, (error, rows) => {
      const movies = createMovieEntities(rows, this.thumbnailDir)
      movies.forEach(m => createThumbnailIfNeeded(m, () => { this.emitChanges() }))
      this.setMovies(this.movies.concat(movies))
      this.isLoading = false
    })
  }

  select(movie) {
    for (const m of this.movies) {
      m.isSelected = m.movie_id === movie.movie_id
    }
    this.emitChanges()
  }

  delete(movie) {
    this.setMovies(_.reject(this.movies, movie))
    this.db.delete(movie.movie_id, error => {
      if (error) { console.error(error) }
    })
    fs.unlink(movie.movie_path, error => {
      if (error) { console.error(`failed to remove item: ${movie.movie_path}`) }
    })
    fs.unlink(movie.getThumbnailPath(), error => {
      if (error) { console.error(`failed to remove thumbnail: ${movie.getThumbnailPath()}`) }
    })
  }

  updateField(name, value) {
    if (this[name] === value) {
      return
    }
    this[name] = value
    this.update()
  }

  setSearchText(t) { this.updateField("searchText", t) }
  setSortColumn(c) { this.updateField("sortColumn", c) }
  setSortDescend(d) { this.updateField("sortDescend", d) }
  setThumbnailSize(s) { this.updateField("thumbnailSize", s) }
}
