import React from "react"
import _ from "lodash"
import { observer, inject } from "mobx-react"

import "./Footer.css"
import { useStores } from "../hooks/useStores"

function Footer({ logStore }) {
  const { logStore } = useStores()
  return <div className="Footer">
    <div className="logs">
      {logStore.logs.map(log => <p>{log}</p>)}
    </div>
  </div>
}

export default observer(Footer)
