import React from "react"
import { observer, inject } from "mobx-react"
import { withRouter } from "react-router"

import { Drawer, MenuItem, Subheader, Divider, ListItem, Avatar } from "material-ui"
import VideoLibraryIcon from "material-ui/svg-icons/av/video-library"
import ActionInfoIcon from "material-ui/svg-icons/action/info"

function AppDrawer({ movieStore, navStore, router }) {
  return <Drawer
    className="AppDrawer"
    docked={false}
    open={navStore.isDrawerOpened}
    onRequestChange={open => navStore.isDrawerOpened = open}>
    <Subheader>Database</Subheader>
    <ListItem
      leftAvatar={<Avatar icon={<VideoLibraryIcon />} />}
      rightIcon={<ActionInfoIcon />}
      primaryText={movieStore.name}
      onTouchTap={() => router.push(`/db/${movieStore.name}`)}
    />
    <Divider />
    <MenuItem>Settings</MenuItem>
  </Drawer>
}

export default withRouter(inject("movieStore", "navStore")(observer(AppDrawer)))
