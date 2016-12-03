import React from "react"
import { render } from "react-dom"
import { Router, Route, IndexRoute, browserHistory  } from "react-router"
import App from "./components/App"
import IndexPage from "./components/IndexPage"
import SettingsPage from "./components/SettingsPage"

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={IndexPage} />
      <Route path="settings" component={SettingsPage} />
    </Route>
  </Router>
, document.getElementById("root"))
