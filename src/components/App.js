// builtin modules
const { remote } = window.require("electron")
const child_process = remote.require("child_process")

// additional modules

import React, { Component } from "react"

// material ui

import { Drawer, MenuItem, Subheader, Divider, ListItem, Avatar } from "material-ui"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import VideoLibraryIcon from "material-ui/svg-icons/av/video-library"
import ActionInfoIcon from "material-ui/svg-icons/action/info"
import theme from "../theme"

// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin()

// components

import MovieList from "./MovieList"
import PreviewComponent from "./Preview"
import HeaderComponent from "./Header"
import Footer from "./Footer"
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
        onChangeSearchText={t => movieStore.setSearchText(t)}
        onChangeSortColumn={c => movieStore.setSortColumn(c)}
        onChangeSortOrder={d => movieStore.setSortDescend(d)}
        onClickMenuButton={() => this.setState({ isDrawerOpened: true })} />
      <Drawer
        docked={false}
        open={this.state.isDrawerOpened}
        onRequestChange={open => this.setState({ isDrawerOpened: open })}>
        <Subheader>Database</Subheader>
        <ListItem
          leftAvatar={<Avatar icon={<VideoLibraryIcon />} />}
          rightIcon={<ActionInfoIcon />}
          primaryText={movieStore.name}
        />
        <Divider />
        <MenuItem>Settings</MenuItem>
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
      {this.props.children}
      <Footer />
    </div></MuiThemeProvider>
  }
}

export default withMovies(App)
