import MainLayout from "../components/m3/MainLayout"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>
}
