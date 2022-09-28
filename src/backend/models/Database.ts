import fs from "fs"
import initSqlJs from "sql.js"

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

    const open = async () => {
      const filebuffer = fs.readFileSync(file)
      const SQL = await initSqlJs()
      this.sqlite = new SQL.Database(filebuffer)
      this.movie = new MovieTable(this.sqlite)
      this.watch = new WatchTable(this.sqlite)
    }
    open()
  }

  close() {}
}
