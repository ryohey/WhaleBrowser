import { observer } from "mobx-react"
import { useStores } from "../hooks/useStores"
import Header from "./Header"

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
