import MenuIcon from "@mui/icons-material/Menu"
import { AppBar, IconButton, Toolbar } from "@mui/material"

export default function Header({ onClickMenuButton, children }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onClickMenuButton}
        >
          <MenuIcon />
        </IconButton>
        {children}
      </Toolbar>
    </AppBar>
  )
}
