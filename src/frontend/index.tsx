import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { App, Provider } from "./components/App"
import DatabasePage from "./components/DatabasePage"
import IndexPage from "./components/IndexPage"
import SettingsPage from "./components/SettingsPage"

const root = createRoot(document.getElementById("root")!)
root.render(
  <Provider>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="db/:path" element={<DatabasePage />} />
        </Routes>
      </App>
    </BrowserRouter>
  </Provider>
)
