import React from "react"

import "./Footer.css"
import { useStores } from "../hooks/useStores"
import { observer } from "mobx-react"

function Footer() {
  const { logStore } = useStores()
  return <div className="Footer">
    <div className="logs">
      {logStore.logs.map(log => <p>{log}</p>)}
    </div>
  </div>
}

export default observer(Footer)
