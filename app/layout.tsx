"use client"
import M3 from "@/core/theme/M3"
import "../styles/globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body id="__next">
        <M3>{children}</M3>
      </body>
    </html>
  )
}
