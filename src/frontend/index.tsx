import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { App, Provider } from "./components/App"
import DatabasePage from "./components/DatabasePage"
import IndexPage from "./components/IndexPage"
import SettingsPage from "./components/SettingsPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "settings",
    element: <SettingsPage />,
  },
  {
    path: "db/:path",
    element: <DatabasePage />,
  },
])

const root = createRoot(document.getElementById("root")!)
root.render(
  <Provider>
    <App>
      <RouterProvider router={router} />
    </App>
  </Provider>
)