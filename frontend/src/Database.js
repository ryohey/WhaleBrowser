const { remote } = window.require("electron")
import MovieEntity from "./MovieEntity"
const sqlite3 = window.require("sqlite3").verbose()

/**
options =
  path: "/path/to/"
  file: "hogefuga"
  thumbnailSize: "120x90x1x1"
*/
export default class Database {
  constructor(options) {
    this.path = options.path
    this.file = options.file
    this.thumbnailSize = options.thumbnailSize
  }

  getThumbnailDir() {
    return `${this.path}thum\\${this.file}\\${this.thumbnailSize}\\`
  }

  start() {
    const dbFilePath = `${this.path}${this.file}.wb`
    console.log(`open ${dbFilePath} ...`)
    this.sqlite = new sqlite3.Database(dbFilePath, sqlite3.OPEN_READWRITE, e => {
      console.error(e)
    })
  }

  selectAll(query, callback) {
    this.sqlite.all(query, (err, movies) => {
      if (err) {
        return callback(err)
      }

      const movieEntities = movies.map(m =>
        new MovieEntity({
          thumbnailDir: this.getThumbnailDir(),
          ...m
        })
      )

      callback(null, movieEntities)
    })
  }
}
