const { remote } = window.require("electron")
const child_process = remote.require("child_process")
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

// other modules

import Footer from "./Footer"
import withMovies from "../withMovies"

import "../sass/main.sass"

class App extends Component {
  componentDidMount() {
    this.props.movieStore.loadMore()
  }

  render() {
    const { movieStore } = this.props

    return <MuiThemeProvider muiTheme={getMuiTheme(theme)}><div id="app">
      <Drawer
        docked={false}
        open={this.props.isDrawerOpened}
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
      {this.props.children}
      <Footer />
    </div></MuiThemeProvider>
  }
}

export default withMovies(App)
