import { FC, useContext } from "react"
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
  useTheme,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/MenuTwoTone"
import ColorIcon from "@mui/icons-material/ColorLensOutlined"
import DarkIcon from "@mui/icons-material/DarkModeOutlined"
import LightIcon from "@mui/icons-material/LightModeOutlined"
import RestartIcon from "@mui/icons-material/RefreshOutlined"
import { useRouter } from "next/router"
import { ThemeModeContext } from "../../../core/theme/context/ThemeModeContext"
import { ThemeSchemeContext } from "../../../core/theme/context/ThemeSchemeContext"
import { ExitToAppRounded, PersonRounded } from "@mui/icons-material"

interface HeaderProps {
  onDrawerToggle?: () => void
  window?: () => Window
}

interface HeaderAuthUserProps {
  avatar?: string
  name?: string
  loggedIn: boolean
}

const Header: FC<HeaderProps> = ({ onDrawerToggle, window }) => {
  const { palette } = useTheme()

  const { toggleThemeMode, resetThemeMode } = useContext(ThemeModeContext)
  const { generateThemeScheme, resetThemeScheme } = useContext(ThemeSchemeContext)

  const changeThemeMode = () => toggleThemeMode()

  const changeThemeScheme = async () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
    generateThemeScheme(randomColor)
  }

  const reset = () => {
    resetThemeMode()
    resetThemeScheme()
  }

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  })

  return (
    <>
      <AppBar color={trigger ? "primary" : "default"} position="sticky" elevation={trigger ? 2 : 0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item sx={{ display: { md: "none", sm: "block" } }}>
              <Tooltip title="Menu">
                <IconButton color="inherit" edge="start" onClick={onDrawerToggle}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item sx={{ display: "flex", alignItems: "baseline" }}>
              <Typography
                color="inherit"
                sx={{ fontWeight: 500, letterSpacing: 0.5, fontSize: 20 }}
              >
                NewQuiz
              </Typography>
            </Grid>

            <Grid item xs></Grid>

            <Grid item>
              <Tooltip title="Change Color">
                <IconButton size="large" color="inherit" onClick={changeThemeScheme}>
                  <ColorIcon />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item>
              <Tooltip title="Switch Theme">
                <IconButton size="large" color="inherit" onClick={changeThemeMode}>
                  {palette.mode == "light" ? <DarkIcon /> : <LightIcon />}
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item>
              <Tooltip title="Reset">
                <IconButton size="large" color="inherit" onClick={reset}>
                  <RestartIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
