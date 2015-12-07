remote = global.require "remote"
child_process = remote.require "child_process"
_u = require "underscore"
MovieEntity = require "./movie_entity.coffee"

coffeePath = "./node_modules/coffee-script/bin/coffee"


###
options =
  path: "/path/to/"
  file: "hogefuga"
  thumbnailSize: "120x90x1x1"
###
module.exports = class
  constructor: (options) ->
    @path = options.path
    @file = options.file
    @thumbnailSize = options.thumbnailSize

  getThumbnailDir: -> 
    "#{@path}thum\\#{@file}\\#{@thumbnailSize}\\"

  start: ->
    dbFilePath = "#{@path}#{@file}.wb"
    console.log "open #{dbFilePath} ..."
    @child = child_process.spawn "node", [coffeePath, "../backend/database.coffee", dbFilePath]

  selectAll: (query, callback) ->
    @child.stdout.once "data", (chunk) =>
      try
        movies = JSON.parse chunk
      catch e
        console.error chunk.toString()
        return callback e, null

      movieEntities = (for m in movies
        m.thumbnailDir = @getThumbnailDir()
        _u.create(MovieEntity.prototype, m)
      )

      callback null, movieEntities

    @child.stderr.once "data", (chunk) =>
      callback chunk.toString(), null

    q = query.build()
    console.log q
    @child.stdin.write q 