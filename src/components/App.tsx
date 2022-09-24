import React, { Component } from "react"

// material ui theme
import theme from "../theme"

// other modules

import Footer from "./Footer"
import "./AppDrawer.css"
import MovieStore from "../stores/MovieStore"
import NavStore from "../stores/NavStore"
import PreferenceStore from "../stores/PreferenceStore"
import DatabaseStore from "../stores/DatabaseStore"
import LogStore from "../stores/LogStore"
import syncPrefs from "../helpers/syncPrefs"

import "../styles/main.styl"
import { StoreContext } from "../hooks/useStores"

function App({ children }) {
  return (
    <div id="app">
      <AppDrawer />
      {children}
      <DevTools />
      <Footer />
    </div>
  )
}

const Provider = () => {
  const databaseStore = new DatabaseStore()
  const movieStore = new MovieStore({
    width: 200,
    height: 150,
    column: 3,
    row: 1,
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

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <StoreContext.Provider
          value={{
            databaseStore: databaseStore,
            logStore: new LogStore(),
            movieStore,
            navStore: new NavStore(),
            preferenceStore: new PreferenceStore(),
            openDatabase: openDatabase,
          }}
        >
          <App />
        </StoreContext.Provider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  )
}

export default Provider
