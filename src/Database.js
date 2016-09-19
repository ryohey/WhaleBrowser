const sqlite3 = window.require("sqlite3").verbose()
import path from "path"

/**
  path: "/path/to/"
  file: "hogefuga"
*/
export default class Database {
  constructor(path, file) {
    this.path = path
    this.file = file
  }

  start() {
    const dbFilePath = path.join(this.path, `${this.file}.wb`)
    console.log(`open ${dbFilePath} ...`)
    this.sqlite = new sqlite3.Database(dbFilePath, sqlite3.OPEN_READWRITE, e => {
      if (e) { console.error(e) }
    })
  }

  selectAll(query, callback) {
    this.sqlite.all(query, callback)
  }

  delete(movie_id, callback) {
    this.sqlite.run(`delete from movie where movie_id=${movie_id}`, callback)
  }
}
