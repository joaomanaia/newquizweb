import { MainDrawer } from "@/components/drawer/main-drawer";
import { MainAppBar } from "@/components/main-app-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen min-h-screen overflow-hidden">
      <MainDrawer className="hidden md:block w-72" />
      <main className="w-full flex flex-col md:px-3">
        <MainAppBar />
        {children}
      </main>
    </div>
  )
}
