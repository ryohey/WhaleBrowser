const sqlite3 = window.require("sqlite3").verbose()

/**
  path: "/path/to/"
  file: "hogefuga"
*/
export default class Database {
  constructor(file) {
    console.log(`open ${file} ...`)
    this.sqlite = new sqlite3.Database(file, sqlite3.OPEN_READWRITE, e => {
      if (e) { console.error(e) }
    })
  }

  close(callback) {
    this.sqlite.close(callback)
  }

  selectAll(query, callback) {
    this.sqlite.all(query, callback)
  }

  delete(movie_id, callback) {
    this.sqlite.run(`delete from movie where movie_id=${movie_id}`, callback)
  }

  insert(record, callback) {
    const q = `insert into movie ${record.build()}`
    debugger
    this.sqlite.run(q, callback)
  }
}
