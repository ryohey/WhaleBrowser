import React from "react"
import { observer, inject } from "mobx-react"
import Header from "./Header"
import { useStores } from "../hooks/useStores"

function SettingsPage() {
  const { navStore } = useStores()
  return (
    <div className="SettingsPage">
      <Header onClickMenuButton={() => (navStore.isDrawerOpened = true)}>
        Settings
      </Header>
    </div>
  )
}

export default observer(SettingsPage)
