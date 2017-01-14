import React from "react"
import _ from "lodash"
import { observer, inject } from "mobx-react"

import "./Footer.css"

function Footer({ logStore }) {
  return <div className="Footer">
    <div className="logs">
      {logStore.logs.map(log => <p>{log}</p>)}
    </div>
  </div>
}

export default inject("logStore")(observer(Footer))
