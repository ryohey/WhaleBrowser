// builtin modules

const { remote } = window.require("electron")
const child_process = remote.require("child_process")
const { Menu, MenuItem } = remote
const fs = remote.require("fs")
import React, { Component } from "react"

// additional modules

import Waypoint from "react-waypoint"

// user modules

import Query from "./Query"
import createThumbnail from "./stm"

// components

import MovieComponent from "./MovieComponent"
import PreviewComponent from "./PreviewComponent"
import HeaderComponent from "./HeaderComponent"

import "../sass/main.sass"

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movies: [],
      sortColumn: "movie_id",
      sortDescend: false,
      searchText: ""
    }
  }

  get db() {
    return this.props.db
  }

  componentDidMount() {
    this.loadMore()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.sortColumn !== prevState.sortColumn ||
        this.state.sortDescend !== prevState.sortDescend ||
        this.state.searchText !== prevState.searchText) {
      this.setState({
        movies: []
      })

      this.loadMore()
    }
  }

  onClickMovie(index) {
    for (const m of this.state.movies) {
      m.isSelected = false
    }
    const movie = this.state.movies[index]
    movie.isSelected = true
    this.setState({
      movies: this.state.movies
    })
  }

  onDoubleClickMovie(index) {
    const movie = this.state.movies[index]
    console.dir(movie)
    this.openPlayer(movie.movie_path)
  }

  openPlayer(file) {
    console.log(file)
    child_process.exec(`explorer ${file}`)
  }

  renderMovies() {
    return this.state.movies.map((i, movie) => {
      return <MovieComponent
        movie={movie}
        key={movie.movie_id}
        onClick={this.onClickMovie.bind(this, i)}
        onDoubleClick={this.onDoubleClickMovie.bind(this, i)} />
    })
  }

  checkThumbnail(movie) {
    const thumbnailPath = movie.getThumbnailPath()
    fs.exists(thumbnailPath, (exists) => {
      if (exists) return
      createThumbnail({
        input: movie.movie_path,
        output: `#{movie.thumbnailDir}*.jpg`,
        addHash: true
      }, (error, stdout, stderr) => {
        if (error) {
          console.error(`failed to create the thumbnail for ${movie.movie_name}`, error)
          return
        }
        console.log(`created the thumbnail for ${movie.movie_name}`)
        movie.isThumbnailCreated = true
        this.setState({
          movies: this.state.movies
        })
      })
    })
  }

  loadMore() {
    const q = this.state.searchText.length > 0 ?
      Query.find(this.state.searchText, this.state.sortColumn, this.state.movies.length, this.state.sortDescend)
      : Query.select(this.state.sortColumn, this.state.movies.length, this.state.sortDescend)

    this.db.selectAll(q, (error, rows) => {
      if (error) {
        console.error(error)
        return
      }
      rows.forEach(row => this.checkThumbnail(row))
      console.dir(rows)
      const movies = this.state.movies.concat(rows)
      this.setState({
        movies: movies
      })
    })
  }

  loadByScroll() {
    if (this.state.movies.length === 0) return
    this.loadMore()
  }

  onChangeSortColumn(column) {
    this.setState({
      sortColumn: column
    })
  }

  onChangeSortOrder(descend) {
    this.setState({
      sortDescend: descend
    })
  }

  onChangeSearchText(text) {
    this.setState({
      searchText: text
    })
  }

  render() {
    return <div id="app">
      <HeaderComponent
        onChangeSearchText={this.onChangeSearchText.bind(this)}
        onChangeSortColumn={this.onChangeSortColumn.bind(this)}
        onChangeSortOrder={this.onChangeSortOrder.bind(this)} />
      <div className="flex">
        <div id="movies">
          {this.renderMovies()}
          <Waypoint
            onEnter={this.loadByScroll.bind(this)}
            onLeave={() => {}}
            threshold={0.2} />
        </div>
        <PreviewComponent movies={this.state.movies} />
      </div>
    </div>
  }
}
