import React from "react"
import { AppBar } from "material-ui"

export default function Header(props) {
  return <AppBar
    title={props.children}
    style={{
      position: "fixed",
      top: 0,
      zIndex: 999
    }}
    onLeftIconButtonTouchTap={props.onClickMenuButton}>
  </AppBar>
}
