"use client"

import ThemeModeProvider from "../core/theme/context/ThemeModeContext"
import ThemeSchemeProvider from "../core/theme/context/ThemeSchemeContext"
import M3ThemeProvider from "../core/theme/m3/M3ThemeProvider"
import { CssBaseline } from "@mui/material"
import "../styles/globals.css"
import MainLayout from "./(m3)/MainLayout"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body>
        <ThemeModeProvider>
          <ThemeSchemeProvider>
            <M3ThemeProvider>
              <CssBaseline enableColorScheme />
              <MainLayout>
                {children}
              </MainLayout>
            </M3ThemeProvider>
          </ThemeSchemeProvider>
        </ThemeModeProvider>
      </body>
    </html>
  )
}
