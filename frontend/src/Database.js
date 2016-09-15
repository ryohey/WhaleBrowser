const { remote } = window.require("electron")
const child_process = remote.require("child_process")
import MovieEntity from "./MovieEntity"

const coffeePath = "./node_modules/coffee-script/bin/coffee"

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
    this.child = child_process.spawn("node", [coffeePath, "../backend/database.coffee", dbFilePath])
  }

  selectAll(query, callback) {
    this.child.stdout.once("data", chunk => {
      let movies
      try {
        movies = JSON.parse(chunk)
      } catch(e) {
        console.error(chunk.toString())
        return callback(e, null)
      }

      const movieEntities = movies.map(m => {
        m.thumbnailDir = this.getThumbnailDir()
        return new MovieEntity(m)
      })

      callback(null, movieEntities)
    })

    this.child.stderr.once("data", chunk => {
      callback(chunk.toString(), null)
    })

    console.log(query)
    this.child.stdin.write(query)
  }
}
