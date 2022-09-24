import React from "react"
import { withRouter } from "react-router"
import { observer, inject } from "mobx-react"

import {
  Drawer,
  MenuItem,
  Subheader,
  Divider,
  ListItem,
  Avatar,
} from "material-ui"
import VideoLibraryIcon from "material-ui/svg-icons/av/video-library"
import ActionInfoIcon from "material-ui/svg-icons/action/info"
import HomeIcon from "material-ui/svg-icons/action/home"
import SettingsIcon from "material-ui/svg-icons/action/settings"

const { remote } = window.require("electron")
const { dialog } = remote

function AppDrawer({ databaseStore, navStore, router, openDatabase }) {
  function closeAndPush(path) {
    navStore.isDrawerOpened = false
    router.push(path)
  }

  function onClickOpenDatabase() {
    dialog.showOpenDialog({ properties: ["openFile"] }, (files) => {
      if (!files || files.length !== 1) {
        return
      }
      openDatabase(files[0])
    })
  }

  return (
    <Drawer
      className="AppDrawer"
      docked={false}
      open={navStore.isDrawerOpened}
      onRequestChange={(open) => (navStore.isDrawerOpened = open)}
    >
      <ListItem
        leftIcon={<HomeIcon />}
        primaryText="Home"
        onTouchTap={() => closeAndPush("/")}
      />
      <Subheader>Database</Subheader>
      {false &&
        databaseStore.databases.map((filePath) => (
          <ListItem
            leftAvatar={<Avatar icon={<VideoLibraryIcon />} />}
            rightIcon={
              <ActionInfoIcon onClick={() => closeAndPush(`/db/${filePath}`)} />
            }
            primaryText={filePath}
            onTouchTap={() => {
              openDatabase(filePath)
              closeAndPush("/")
            }}
          />
        ))}
      <ListItem primaryText="Open Database" onTouchTap={onClickOpenDatabase} />
      <Divider />
      <ListItem
        leftIcon={<SettingsIcon />}
        primaryText="Settings"
        onTouchTap={() => closeAndPush("/settings")}
      />
    </Drawer>
  )
}

export default withRouter(
  inject("databaseStore", "navStore", "openDatabase")(observer(AppDrawer))
)
