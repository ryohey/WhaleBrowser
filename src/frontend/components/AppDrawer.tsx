import { observer } from "mobx-react"

import HomeIcon from "@mui/icons-material/Home"
import ActionInfoIcon from "@mui/icons-material/Info"
import SettingsIcon from "@mui/icons-material/Settings"
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary"
import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material"
import { useStores } from "../hooks/useStores"

function AppDrawer() {
  const { databaseStore, navStore, openDatabase } = useStores()
  // const navigate = useNavigate()

  function closeAndPush(path) {
    navStore.isDrawerOpened = false
    // navigate(path)
  }

  function onClickOpenDatabase() {
    // TODO: Move to main process
    // dialog.showOpenDialog({ properties: ["openFile"] }, (files) => {
    //   if (!files || files.length !== 1) {
    //     return
    //   }
    //   openDatabase(files[0])
    // })
  }

  return (
    <Drawer
      className="AppDrawer"
      open={navStore.isDrawerOpened}
      onClose={() => (navStore.isDrawerOpened = false)}
    >
      <ListItem onClick={() => closeAndPush("/")}>
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </ListItem>
      <ListSubheader>Database</ListSubheader>
      {databaseStore.databases.map((filePath) => (
        <ListItem
          onClick={() => {
            openDatabase(filePath)
            closeAndPush("/")
          }}
          secondaryAction={
            <IconButton
              edge="end"
              onClick={() => closeAndPush(`/db/${filePath}`)}
            >
              <ActionInfoIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar>
              <VideoLibraryIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={filePath} />
        </ListItem>
      ))}
      <ListItem onClick={onClickOpenDatabase}>
        <ListItemText primary="Open Database" />
      </ListItem>
      <Divider />
      <ListItem onClick={() => closeAndPush("/settings")}>
        <ListItemAvatar>
          <Avatar>
            <SettingsIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Settings" />
      </ListItem>
    </Drawer>
  )
}

export default observer(AppDrawer)
