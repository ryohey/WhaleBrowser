// material ui theme
import { theme } from "../theme"

// other modules

import DatabaseStore from "../stores/DatabaseStore"
import LogStore from "../stores/LogStore"
import MovieStore from "../stores/MovieStore"
import NavStore from "../stores/NavStore"
import PreferenceStore from "../stores/PreferenceStore"
import Footer from "./Footer"

import { ThemeProvider } from "@mui/material"
import { StoreContext } from "../hooks/useStores"
import "../styles/main.css"
import AppDrawer from "./AppDrawer"

export function App({ children }: any) {
  return (
    <div id="app">
      <AppDrawer />
      {children}
      <Footer />
    </div>
  )
}

export const Provider = ({ children }: any) => {
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

  return (
    <ThemeProvider theme={theme}>
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
        {children}
      </StoreContext.Provider>
    </ThemeProvider>
  )
}
