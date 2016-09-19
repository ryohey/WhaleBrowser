import path from "path"
import _ from "lodash"
import fs from "fs"
import sinku from "./sinku"

function formatDate(n) {
  return `${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()} ${n.getHours()}:${n.getMinutes()}:${n.getSeconds()}`
}

export default class MovieRecord {
  constructor(file) {
    this.movie_name = path.parse(file).name
    this.movie_path = file
    this.regist_date = formatDate(new Date())
    this.last_date = this.regist_date
    const stat = fs.lstatSync(file)
    this.file_date = formatDate(stat.mtime)
  }

  inspect(callback) {
    sinku(this.movie_path, (error, o) => {
      if (error) {
        return callback(error)
      }
      this.movie_length = parseInt(o.movie_length)
      this.movie_size = parseInt(o.movie_size)
      this.container = o.container.toString()
      this.extra = o.extra.toString()
      this.audio = o.audio.toString()
      this.video = o.video.toString()
      callback(null, this)
    })
  }


  // sqlite の insert 用に `(key, key, ...) values (value, value, ...)` の形式の文字列を出力する
  build() {
    const r = this
    const keys = [
      "movie_name",
      "movie_path",
      "movie_length",
      "movie_size",
      "last_date",
      "file_date",
      "regist_date",
      "score",
      "view_count",
      "hash",
      "container",
      "video",
      "audio",
      "extra",
      "title",
      "artist",
      "album",
      "grouping",
      "writer",
      "genre",
      "track",
      "camera",
      "create_time",
      "kana",
      "roma",
      "tag",
      "comment1",
      "comment2",
      "comment3"
    ]

    const values = keys.map(key => {
      const v = r[key]
      if (!v) {
        return `""`
      }
      return _.isString(v) ? `"${v}"` : `${v}`
    })

    return `(${keys.join(", ")}) values (${values.join(", ")})`
  }
}
