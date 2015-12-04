## builtin modules

remote = global.require "remote"
React = require "react"
ReactDOM = require "react-dom"
child_process = remote.require "child_process"
Menu = remote.Menu
MenuItem = remote.MenuItem
fs = remote.require "fs"
_u = require "underscore"

## additional modules

Waypoint = require "react-waypoint"

## user modules

Database = require "./database.coffee"
createThumbnail = require "./stm.coffee"

## components

MovieComponent = require "./movie_component.coffee"
PreviewComponent = require "./preview_component.coffee"
HeaderComponent = require "./header_component.coffee"

## 

db = new Database
  path: "\\\\rack\\d\\Program Files\\WhiteBrowser\\"
  file: "solid_video"
  thumbnailSize: "120x90x1x1"

db.start()

App = React.createClass 
  getLastMovieId: ->
    return 0 if @state.movies.length is 0
    @state.movies[@state.movies.length - 1].movie_id

  getInitialState: ->
    movies: []

  componentDidMount: ->
    @loadMore()

  onClickMovie: (index) ->
    m.isSelected = false for m in @state.movies
    movie = @state.movies[index]
    movie.isSelected = true
    @setState
      movies: @state.movies

  onDoubleClickMovie: (index) ->
    movie = @state.movies[index]
    console.dir movie
    @openPlayer(movie.movie_path)

  openPlayer: (file) ->
    console.log file
    child_process.exec "explorer #{file}"

  renderMovies: ->
    for i, movie of @state.movies
      <MovieComponent 
        movie=movie 
        key=movie.movie_id 
        onClick={@onClickMovie.bind @, i}
        onDoubleClick={@onDoubleClickMovie.bind @, i} />

  checkThumbnail: (movie) ->
    thumbnailPath = movie.getThumbnailPath()
    fs.exists thumbnailPath, (exists) =>
      return if exists
      createThumbnail
        input: movie.movie_path
        output: "#{movie.thumbnailDir}*.jpg"
        addHash: true
      , (error, stdout, stderr) =>
        if error?
          console.error "failed to create the thumbnail for #{movie.movie_name}", error
          return
        console.log "created the thumbnail for #{movie.movie_name}"
        movie.isThumbnailCreated = true
        @setState
          movies: @state.movies

  loadMore: ->
    lastId = @getLastMovieId()
    console.log "load more movies... (#{lastId})"
    db.getNextMovies lastId, (error, rows) =>
      if error?
        console.error error
        return
      @checkThumbnail(row) for row in rows
      movies = @state.movies.concat rows
      @setState
        movies: movies

  loadByScroll: ->
    return if @state.movies.length is 0
    @loadMore()

  render: ->
    <div id="app">
      <HeaderComponent />
      <div className="flex">
        <div id="movies">
          {@renderMovies()}
          <Waypoint
            onEnter={@loadByScroll}
            onLeave={ -> }
            threshold={0.2} />
        </div>
        <PreviewComponent movies={@state.movies} />
      </div>
    </div>

ReactDOM.render <App/>, document.getElementById("root")
