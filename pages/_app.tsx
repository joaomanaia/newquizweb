import "../styles/globals.css"
import type { AppProps } from "next/app"
import ThemeModeProvider from "../app/theme/context/ThemeModeContext"
import ThemeSchemeProvider from "../app/theme/context/ThemeSchemeContext"
import M3ThemeProvider from "../app/theme/m3/M3ThemeProvider"
import { CssBaseline } from "@mui/material"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeModeProvider>
      <ThemeSchemeProvider>
        <M3ThemeProvider>
          <CssBaseline enableColorScheme />
          <Component {...pageProps} />
        </M3ThemeProvider>
      </ThemeSchemeProvider>
    </ThemeModeProvider>
  )
}

export default MyApp
