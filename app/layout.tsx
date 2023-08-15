import M3 from "@/core/theme/M3"
import "../styles/globals.css"

export const metadata = {
  manifest: "/manifest.json",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body id="__next">
        <M3>{children}</M3>
      </body>
    </html>
  )
}
