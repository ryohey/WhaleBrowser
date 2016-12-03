// builtin modules
const { remote } = window.require("electron")
const child_process = remote.require("child_process")

// additional modules

import React, { Component } from "react"

// material ui

import { Drawer, MenuItem } from "material-ui"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import theme from "../theme"

// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin()

// components

import MovieList from "./MovieList"
import PreviewComponent from "./Preview"
import HeaderComponent from "./Header"
import withMovies from "../withMovies"

import "../sass/main.sass"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isDrawerOpened: false
    }
  }

  componentDidMount() {
    this.props.movieStore.loadMore()
  }

  render() {
    const movies = this.props.movies
    const movieStore = this.props.movieStore

    const onClickMovie = movie => {
      movieStore.select(movie)
    }

    const onDoubleClickMovie = (movie) => {
      child_process.exec(`explorer ${movie.movie_path}`)
    }

    const onClickMenuDelete = (movie) => {
      movieStore.delete(movie)
    }

    return <MuiThemeProvider muiTheme={getMuiTheme(theme)}><div id="app">
      <HeaderComponent
        title={movieStore.name}
        onChangeSearchText={t => movieStore.setSearchText(t)}
        onChangeSortColumn={c => movieStore.setSortColumn(c)}
        onChangeSortOrder={d => movieStore.setSortDescend(d)}
        onClickMenuButton={() => this.setState({ isDrawerOpened: true })} />
      <Drawer
        open={this.state.isDrawerOpened}
        onRequestChange={open => this.setState({ isDrawerOpened: open })}>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </Drawer>
      <div className="flex">
        <MovieList
          movies={movies}
          onClickMovie={onClickMovie}
          onDoubleClickMovie={onDoubleClickMovie}
          onClickMenuDelete={onClickMenuDelete}
          loadMore={() => movieStore.loadMore()} />
        <PreviewComponent movies={movies} />
      </div>
    </div></MuiThemeProvider>
  }
}

export default withMovies(App)
