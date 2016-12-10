import React from "react"
import { observer, inject } from "mobx-react"
import { withRouter } from "react-router"

import { Drawer, MenuItem, Subheader, Divider, ListItem, Avatar } from "material-ui"
import VideoLibraryIcon from "material-ui/svg-icons/av/video-library"
import ActionInfoIcon from "material-ui/svg-icons/action/info"
import HomeIcon from "material-ui/svg-icons/action/home"
import SettingsIcon from "material-ui/svg-icons/action/settings"

function AppDrawer({ movieStore, navStore, router }) {
  function closeAndPush(path) {
    navStore.isDrawerOpened = false
    router.push(path)
  }
  return <Drawer
    className="AppDrawer"
    docked={false}
    open={navStore.isDrawerOpened}
    onRequestChange={open => navStore.isDrawerOpened = open}>
    <ListItem
      leftIcon={<HomeIcon />}
      primaryText="Home"
      onTouchTap={() => closeAndPush("/")}
    />
    <Subheader>Database</Subheader>
    <ListItem
      leftAvatar={<Avatar icon={<VideoLibraryIcon />} />}
      rightIcon={<ActionInfoIcon />}
      primaryText={movieStore.name}
      onTouchTap={() => closeAndPush(`/db/${movieStore.name}`)}
    />
    <Divider />
    <ListItem
      leftIcon={<SettingsIcon />}
      primaryText="Settings"
      onTouchTap={() => closeAndPush("/settings")}
    />
  </Drawer>
}

export default withRouter(inject("movieStore", "navStore")(observer(AppDrawer)))
