import MainLayout from "../components/m3/MainLayout"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
