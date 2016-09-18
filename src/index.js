import React from "react"
import { render } from "react-dom"
import Database from "./Database"
import App from "./App"

const db = new Database({
  path: "\\path\\to\\wb\\",
  file: "wb-file-name",
  thumbnailSize: "120x90x1x1"
})

db.start()

render(<App db={db} />, document.getElementById("root"))
