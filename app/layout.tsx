import { Inter as FontSans } from "next/font/google"
import { ThemeProvider as NextThemeProvider } from "next-themes"
import { cn } from "@/lib/utils"
import "./styles/tokens.css"
import "./styles/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s - NewQuiz",
    default: "NewQuiz",
  },
  description: "Do you like to challenge your knowledge? So NewQuiz is the ideal game for you.",
  manifest: "/manifest.json",
  keywords: ["quiz", "game", "knowledge", "challenge", "newquiz"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NewQuiz",
    title: "NewQuiz",
    description: "Do you like to challenge your knowledge? So NewQuiz is the ideal game for you.",
  },
  applicationName: "NewQuiz",
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
