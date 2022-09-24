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
import LogStore from "../stores/LogStore"
import syncPrefs from "../helpers/syncPrefs"

import "../styles/main.styl"

function App({ children }) {
  return <div id="app">
    <AppDrawer />
    {children}
    <DevTools />
    <Footer />
  </div>
}

const Provider = () => {
      const databaseStore = new DatabaseStore()
      const movieStore= new MovieStore({
        width: 200,
        height: 150,
        column: 3,
        row: 1
      })

      function openDatabase(file) {
        movieStore.setDatabasePath(file)
  
        if (!databaseStore.databases.includes(file)) {
          databaseStore.databases = databaseStore.databases.concat([file])
        }
        databaseStore.currentDatabase = file
      }

      syncPrefs({ databaseStore }, () => {
        openDatabase(databaseStore.currentDatabase)
      })

      return <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <StoreContext.Provider value={
          {databaseStore: databaseStore,
          logStore: new LogStore(),
        movieStore,
      navStore: new NavStore(),
      preferenceStore: new PreferenceStore(),
      openDatabase:this.openDatabase}
        }>
          <App />
        </StoreContext.Provider>
      </MuiThemeProvider>
}

export default Provider
