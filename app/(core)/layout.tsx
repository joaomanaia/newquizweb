import "@/styles/globals.css"
import MainLayout from "../components/m3/MainLayout"

export const metadata = {}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>
}
