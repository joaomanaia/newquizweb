"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { DrawerItem } from "./drawer-item"
import React from "react"
import { cn } from "@/lib/utils"
import { NavDrawerItemType } from "@/components/drawer/types"
import { HomeIcon, ListIcon } from "lucide-react"

export interface MainDrawerProps {
  usingSheet?: boolean
  className?: string
}

interface NavDrawerItemGroup {
  id: string
  hideTitle?: boolean
  children: NavDrawerItemType[]
}

const categories: NavDrawerItemGroup[] = [
  {
    id: "Home",
    hideTitle: true,
    children: [
      {
        title: "Home",
        Icon: HomeIcon,
        route: "/",
      },
      {
        title: "Multi Choice Quiz",
        Icon: ListIcon,
        route: "/list/multichoicequiz"
      }
    ],
  },
]

export const MainDrawer: React.FC<MainDrawerProps> = ({ usingSheet, className }) => {
  const pathName = usePathname()

  return (
    <nav className={cn("flex flex-col px-4 py-4 space-y-7 justify-start", className)}>
      <Link
        href="/"
        className="next-link px-2 py-2 w-fit rounded-2xl text-foreground/80 hover:text-foreground/90 font-medium tracking-[0.5]"
        style={{ fontSize: 20 }}
      >
        NewQuiz
      </Link>
      <ul
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
        className="flex flex-col ml-0 py-0 px-0"
      >
        {categories.map(({ id, children, hideTitle }) => (
          <React.Fragment key={id}>
            {!hideTitle && <p className="py-2 px-3 text-sm self-start">{id}</p>}
            {children.map((navDrawerItem) => (
              <li itemProp="name" key={navDrawerItem.title} className="list-none">
                <DrawerItem
                  item={navDrawerItem}
                  selected={pathName == navDrawerItem.route}
                  usingSheet={usingSheet}
                />
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  )
}
