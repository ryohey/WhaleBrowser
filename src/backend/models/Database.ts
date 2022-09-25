import fs from "fs"
import sql from "sql.js"

import MovieTable from "./Table/MovieTable"
import WatchTable from "./Table/WatchTable"

/**
  path: "/path/to/"
  file: "hogefuga"
*/
export default class Database {
  sqlite
  movie
  watch

  constructor(file) {
    console.log(`open ${file} ...`)
    const filebuffer = fs.readFileSync(file)
    this.sqlite = new sql.Database(filebuffer)
    this.movie = new MovieTable(this.sqlite)
    this.watch = new WatchTable(this.sqlite)
  }

  close() {}
}
