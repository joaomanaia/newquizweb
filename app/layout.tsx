import { Inter as FontSans } from "next/font/google"
import { ThemeProvider as NextThemeProvider } from "next-themes"
import { cn } from "@/lib/utils"
import "./styles/tokens.css"
import "./styles/globals.css"

export const metadata = {
  manifest: "/manifest.json",
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <NextThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </NextThemeProvider>
      </body>
    </html>
  )
}
