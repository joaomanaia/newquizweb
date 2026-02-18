"use client"

import Link from "next/link"
import { useSelectedLayoutSegments } from "next/navigation"
import { HomeIcon, ListIcon, type LucideIcon } from "lucide-react"
import type { Route } from "next"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export interface NavDrawerItem {
  id: string
  title: string
  Icon: LucideIcon
  path: Route
  requireAuth?: boolean
  disabled?: boolean
}

interface NavDrawerItemGroup {
  id: string
  title: string
  hideTitle?: boolean
  children: NavDrawerItem[]
}

const categories: NavDrawerItemGroup[] = [
  {
    id: "home",
    title: "Home",
    hideTitle: true,
    children: [
      {
        id: "home",
        title: "Home",
        Icon: HomeIcon,
        path: "/",
      },
      {
        id: "multichoicequiz",
        title: "Multichoice Quiz",
        Icon: ListIcon,
        path: "/list/multichoicequiz",
      },
    ],
  },
]

export function SidebarNavigation() {
  const layoutSegments = useSelectedLayoutSegments()
  const currentPath = `/${layoutSegments.join("/")}`

  return (
    <>
      {categories.map(({ id, title, children, hideTitle }) => (
        <SidebarGroup key={id}>
          {!hideTitle && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {children.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    size="lg"
                    isActive={currentPath === item.path || currentPath.startsWith(`${item.path}/`)}
                    disabled={item.disabled}
                    aria-disabled={item.disabled}
                    className="rounded-full px-4"
                    render={
                      <Link href={item.path}>
                        <item.Icon />
                        <span>{item.title}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}
