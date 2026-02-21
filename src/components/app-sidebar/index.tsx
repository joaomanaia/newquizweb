import Link from "next/link"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"
import { AppLogo } from "@/components/app-sidebar/app-logo"
import { SidebarNavigation } from "@/components/app-sidebar/sidebar-navigation"

export function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center">
          <Link href="/">
            <AppLogo className="hidden group-data-[collapsible=icon]:block" />
          </Link>
          <Link
            href="/"
            className="next-link text-foreground/80 hover:text-foreground/90 w-fit rounded-2xl px-2 py-2 font-medium tracking-[0.5] group-data-[collapsible=icon]:hidden"
            style={{ fontSize: 20 }}
          >
            NewQuiz
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavigation />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
