"use client"

import DarkIcon from "@mui/icons-material/DarkModeOutlined"
import LightIcon from "@mui/icons-material/LightModeOutlined"
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from "@mui/material"
import BaseSettingsContainer from "./BaseSettingsContainer"
import ColorsComponent from "./theme/ColorsComponent"
import { useTheme } from "next-themes"

const ThemeSettings: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const resetTheme = () => {
    // generateScheme("#6750a4")
    setTheme("light")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <BaseSettingsContainer header="Theme">
      <ListItem>
        <ColorsComponent />
      </ListItem>
      <ListItem sx={{ marginTop: "20px !important" }}>
        <ListItemIcon>{theme === "dark" ? <DarkIcon /> : <LightIcon />}</ListItemIcon>
        <ListItemText id="switch-list-label-theme" primary="Night mode" />
        <Switch
          edge="end"
          onChange={toggleTheme}
          checked={theme === "dark"}
          inputProps={{
            "aria-labelledby": "switch-list-label-theme",
          }}
        />
      </ListItem>
      <ListItemButton onClick={resetTheme}>
        <ListItemText primary="Reset theme" />
      </ListItemButton>
    </BaseSettingsContainer>
  )
}

export default ThemeSettings
