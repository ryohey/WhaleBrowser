const { remote } = window.require("electron")
const fs = remote.require("fs")

import { observable, action } from "mobx"
import _ from "lodash"
import path from "path"
import Database from "../models/Database"
import MovieEntity from "../MovieEntity"
import createMovie from "../createMovie"
import createThumbnail from "../stm"

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
      output: `${movie.thumbnailDir}*.jpg`,
      addHash: true
    }, error => {
      if (error) {
        console.error(`failed to create the thumbnail for ${movie.movie_name}`, error)
        return
      }
      console.log(`created the thumbnail for ${movie.movie_name}`)
      callback()
    })
  })
}

export default class MovieStore {
  @observable movies = []
  @observable isLoading = false

  constructor(dbFile, thumbnailSize) {
    this.movies = []
    this.searchText = ""
    this.sortColumn = "movie_id"
    this.sortDescend = false

    this.thumbnailSize = thumbnailSize
    this.setDatabasePath(dbFile)
  }

  get name() {
    return path.basename(this.dbFile)
  }

  add(filePath) {
    createMovie(filePath)
      .then(movie => this.db.movie.insert(movie))
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
  }

  clear() {
    this.movies = []
  }

  update() {
    this.movies = []
    this.loadMore()
  }

  loadMore() {
    if (!this.db || this.isLoading) {
      return
    }

    this.isLoading = true

    this.db.movie.getNext(
      this.searchText,
      this.sortColumn,
      this.movies.length,
      this.sortDescend)
      .then(rows => {
        const movies = createMovieEntities(rows, this.thumbnailDir)
        movies.forEach(m => createThumbnailIfNeeded(m, () => {
          m.isThumbnailCreated = true
          this.setMovies(this.movies)
        }))
        this.setMovies(this.movies.concat(movies))
        this.isLoading = false
      })
  }

  @action select(movie) {
    for (const m of this.movies) {
      m.isSelected = m.movie_id === movie.movie_id
    }
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