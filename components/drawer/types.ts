import type { LucideIcon } from "lucide-react"
import type { Route } from "next"

export type NavDrawerItemType = {
  title: string
  Icon: LucideIcon
  route: Route
  requireAuth?: boolean
  disabled?: boolean
}
