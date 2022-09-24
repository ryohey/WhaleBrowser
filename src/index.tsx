import { render } from "react-dom"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
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

render(<RouterProvider router={router} />, document.getElementById("root"))
