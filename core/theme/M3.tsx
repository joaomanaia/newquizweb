"use client"

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { ThemeProvider as NextThemeProvider } from "next-themes"
import ThemeSchemeProvider from "./providers/ThemeSchemeProvider"
import M3Theme from "./wrapper/M3Theme"

interface M3Props {
  children?: React.ReactNode
}

const M3 = ({ children }: M3Props) => {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <NextThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ThemeSchemeProvider>
          <M3Theme>{children}</M3Theme>
        </ThemeSchemeProvider>
      </NextThemeProvider>
    </AppRouterCacheProvider>
  )
}

export default M3
