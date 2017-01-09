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
import PreferenceStore from "../stores/PreferenceStore"
import DatabaseStore from "../stores/DatabaseStore"
import syncPrefs from "../helpers/syncPrefs"

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

      const prefStore = new PreferenceStore()
      const databaseStore = new DatabaseStore()

      this.state = {
        movieStore: new MovieStore({
          width: 200,
          height: 150,
          column: 3,
          row: 1
        }),
        navStore: new NavStore(),
        prefStore,
        databaseStore
      }

      syncPrefs(this.state, () => {
        this.openDatabase(databaseStore.currentDatabase)
      })

      this.openDatabase = this.openDatabase.bind(this)
    }

    openDatabase(file) {
      const { movieStore, databaseStore } = this.state
      movieStore.setDatabasePath(file)

      if (!databaseStore.databases.includes(file)) {
        databaseStore.databases = databaseStore.databases.concat([file])
      }
      databaseStore.currentDatabase = file
    }

    render() {
      const { movieStore, navStore, prefStore, databaseStore } = this.state

      return <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <Provider
          movieStore={movieStore}
          navStore={navStore}
          prefStore={prefStore}
          databaseStore={databaseStore}
          openDatabase={this.openDatabase}>
          <WrappedComponent {...this.props} />
        </Provider>
      </MuiThemeProvider>
    }
  }
}

export default provider(App)
