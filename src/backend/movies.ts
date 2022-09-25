const setDatabasePath = (file: string) => {
  if (file === this.dbFile) {
    return
  }
  if (this.db) {
    this.db.close((error) => {
      if (error) {
        console.error(error)
      }
    })
  }
  this.dbFile = file
  this.db = new Database(file)
}

function createMovieEntities(rows, thumbnailDir) {
  return rows.map((r) =>
    _.create(MovieEntity.prototype, {
      thumbnailDir: thumbnailDir,
      ...r,
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
  fs.exists(thumbnailPath).then((exists) => {
    if (exists) return
    createThumbnail(
      {
        input: movie.movie_path,
        output: `${movie.thumbnailDir}*.jpg`,
        addHash: true,
      },
      (error) => {
        if (error) {
          console.error(
            `failed to create the thumbnail for ${movie.movie_name}`,
            error
          )
          return
        }
        console.log(`created the thumbnail for ${movie.movie_name}`)
        callback()
      }
    )
  })
}

const getMovies = () => {
  this.db.movie
    .getNext(
      this.searchText,
      this.sortColumn,
      this.movies.length,
      this.sortOrder
    )
    .then((rows) => {
      const movies = createMovieEntities(rows, this.thumbnailDir)
      movies.forEach((m) =>
        createThumbnailIfNeeded(m, () => {
          m.isThumbnailCreated = true
          this.setMovies(this.movies)
        })
      )
      this.setMovies(this.movies.concat(movies))
      this.isLoading = false
    })
}

const deleteMovie = (movie) => {
  this.db.movie
    .delete(movie.movie_id)
    .then(() => fs.unlink(movie.movie_path))
    .then(() => fs.unlink(movie.getThumbnailPath()))
    .then(() => this.setMovies(_.reject(this.movies, movie)))
    .catch((error) => console.error(error))
}

const addMovie = (filePath: string) => {
  createMovie(filePath).then((movie) => this.db.movie.insert(movie))
}

const thumbnailDir = () => {
  return createThumbnailDir(this.dbFile, this.thumbnailSize)
}

const getName = () => {
  return path.basename(this.dbFile)
}
