import sql from "sql.js"
import fs from "fs"

/**
  path: "/path/to/"
  file: "hogefuga"
*/
export default class Database {
  constructor(file) {
    console.log(`open ${file} ...`)
    const filebuffer  = fs.readFileSync(file)
    this.sqlite = new sql.Database(filebuffer)
  }

  close(callback) {
  }

  selectAll(query, callback) {
    const stmt = this.sqlite.prepare(query)
    const rows = []
    while(stmt.step()) {
        const row = stmt.getAsObject()
        rows.push(row)
    }
    callback(null, rows)
  }

  delete(movie_id, callback) {
    const result = this.sqlite.run(`delete from movie where movie_id=${movie_id}`, callback)
    debugger
    callback(result)
  }

  insert(record, callback) {
    const q = `insert into movie ${record.build()}`
    const result = this.sqlite.run(q, callback)
    debugger
    callback(result)
  }
}
