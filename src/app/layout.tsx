import { Inter as FontSans } from "next/font/google"
import { ThemeProvider as NextThemeProvider } from "next-themes"
import { cn } from "@/lib/utils"
import "./styles/tokens.css"
import "./styles/globals.css"
import { GoogleAnalytics } from "@next/third-parties/google"
import type { Metadata } from "next"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { TooltipProvider } from "@/components/ui/tooltip"

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
  verification: {
    google: "vduNWIMxVDPQZoidzqpL-4nO41GAbOB_LOGrfAJAFms",
  },
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-background min-h-screen font-sans antialiased", fontSans.variable)}>
        <NextThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
          </TooltipProvider>
        </NextThemeProvider>
        <GoogleAnalytics gaId="G-G61J40MJQZ" />
      </body>
    </html>
  )
}
