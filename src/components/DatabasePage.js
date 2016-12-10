import React from "react"
import { observer, inject } from "mobx-react"
import Header from "./Header"

function DatabasePage({ navStore }) {
  return <div className="DatabasePage">
    <Header onClickMenuButton={() => navStore.isDrawerOpened = true}>
      Database
    </Header>
  </div>
}

export default inject("navStore")(observer(DatabasePage))
