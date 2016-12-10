import React, { Component } from "react"
import { Provider } from "mobx-react"
import DevTools from "mobx-react-devtools"

// material ui theme
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import theme from "../theme"

// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin()

// other modules

import Footer from "./Footer"
import AppDrawer from "./AppDrawer"
import MovieStore from "../stores/MovieStore"
import NavStore from "../stores/NavStore"

import "../sass/main.sass"

function App({ children }) {
  return <div id="app">
    <AppDrawer />
    {children}
    <DevTools />
    <Footer />
  </div>
}

function provider(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props)

      this.movieStore = new MovieStore("G:\\Program Files\\WhiteBrowser\\db.wb", {
        width: 200,
        height: 150,
        column: 3,
        row: 1
      })

      this.navStore = new NavStore()
    }

    render() {
      return <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <Provider movieStore={this.movieStore} navStore={this.navStore}>
          <WrappedComponent {...this.props} />
        </Provider>
      </MuiThemeProvider>
    }
  }
}

export default provider(App)
