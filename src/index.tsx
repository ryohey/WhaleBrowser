import React from "react"
import { render } from "react-dom"
import IndexPage from "./components/IndexPage"
import SettingsPage from "./components/SettingsPage"
import DatabasePage from "./components/DatabasePage"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { StoreContext } from "./hooks/useStores"
import DatabaseStore from "./stores/DatabaseStore"
import LogStore from "./stores/LogStore"
import MovieStore from "./stores/MovieStore"
import NavStore from "./stores/NavStore"
import PreferenceStore from "./stores/PreferenceStore"

const router = createBrowserRouter([
  {
    path: "/",
    element: IndexPage,
  },
  {
    path: "settings",
    element: SettingsPage,
  },
  {
    path: "db/:path",
    element: DatabasePage,
  },
])

render(<RouterProvider router={router} />, document.getElementById("root"))
