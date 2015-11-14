sqlite3 = require("sqlite3").verbose()

#rootDir = "\\\\Rack/d/Program Files/WhiteBrowser/"
rootDir = "../"

db = new sqlite3.Database rootDir + "dojinshi.wb", sqlite3.OPEN_READWRITE, (err) ->
  console.dir err

movies = []

getLastMovieId = () ->
  return 0 if movies.length is 0
  movies[movies.length - 1].movie_id

db.all """
  select * from movie
  where movie_id > $last_id
  order by movie_id
  limit 100""", {$last_id: getLastMovieId()}, (err, rows, a) ->
  movies = movies.concat rows
  console.dir err
  console.dir rows
