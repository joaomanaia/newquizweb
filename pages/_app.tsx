import "../styles/globals.css"
import type { AppProps } from "next/app"
import ThemeModeProvider from "../app/theme/context/ThemeModeContext"
import ThemeSchemeProvider from "../app/theme/context/ThemeSchemeContext"
import M3ThemeProvider from "../app/theme/m3/M3ThemeProvider"
import { CssBaseline } from "@mui/material"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="google-site-verification" content="vduNWIMxVDPQZoidzqpL-4nO41GAbOB_LOGrfAJAFms" />
      </Head>

      <ThemeModeProvider>
        <ThemeSchemeProvider>
          <M3ThemeProvider>
            <CssBaseline enableColorScheme />
            <Component {...pageProps} />
          </M3ThemeProvider>
        </ThemeSchemeProvider>
      </ThemeModeProvider>
    </>
  )
}

export default MyApp
