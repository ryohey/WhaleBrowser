import React from "react"
import { observer, inject } from "mobx-react"
import Header from "./Header"

function SettingsPage({ navStore }) {
  return <div className="SettingsPage">
    <Header onClickMenuButton={() => navStore.isDrawerOpened = true}>
      Settings
    </Header>
  </div>
}

export default inject("navStore")(observer(SettingsPage))
