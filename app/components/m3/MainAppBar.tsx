"use client"

import { AppBar, Grid, IconButton, Toolbar, useScrollTrigger } from "@mui/material"
import MenuIcon from "@mui/icons-material/MenuTwoTone"

interface HeaderProps {
  onDrawerToggle?: () => void
  window?: () => Window
}

const MainAppBar: React.FC<HeaderProps> = ({ onDrawerToggle, window }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  })

  return (
    <>
      <AppBar position="sticky" elevation={trigger ? 2 : 0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item sx={{ display: { md: "none", sm: "block" } }}>
              <IconButton color="inherit" edge="start" onClick={onDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Grid>

            <Grid item xs></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default MainAppBar
