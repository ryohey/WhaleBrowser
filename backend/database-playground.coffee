child_process = require "child_process"
coffeePath = "./node_modules/coffee-script/bin/coffee"

class Database
  constructor: ->
    @movies = []

  start: ->
    file = "./dojinshi.wb"
    @child = child_process.spawn "node", [coffeePath, "database.coffee", file]

  getLastMovieId: ->
    return 0 if @movies.length is 0
    @movies[@movies.length - 1].movie_id

  getNextMovies: ->
    @child.stdin.write """
      select * from movie
      where movie_id > #{@getLastMovieId()}
      order by movie_id
      limit 10"""

    @child.stdout.once "data", (chunk) ->
      d = JSON.parse chunk
      console.dir d

    @child.stderr.once "data", (data) ->
      console.log('There was an error: ' + data);

database = new Database
database.start()
database.getNextMovies()
