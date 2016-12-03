import React from "react"
import { render } from "react-dom"
import { Router, Route, IndexRoute, hashHistory  } from "react-router"
import App from "./components/App"
import IndexPage from "./components/IndexPage"
import SettingsPage from "./components/SettingsPage"
import DatabasePage from "./components/DatabasePage"

render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={IndexPage} />
      <Route path="settings" component={SettingsPage} />
      <Route path="db/:path/" component={DatabasePage} />
    </Route>
  </Router>
, document.getElementById("root"))
