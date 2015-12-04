sqlite3 = require "sqlite3"

db = new sqlite3.Database process.argv[2], sqlite3.OPEN_READWRITE, (err) ->
  console.error err if err?

process.stdin.on "data", (chunk) ->
  data = chunk.toString()
  db.all data, (error, result) ->
    console.log JSON.stringify result

process.stdin.resume()
