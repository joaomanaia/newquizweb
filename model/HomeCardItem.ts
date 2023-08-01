import { PaperPropsVariantOverrides, SvgIconTypeMap } from "@mui/material"
import { OverridableStringUnion } from "@mui/types"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import React from "react"
import { UrlObject } from "url"

export default class HomeCardItem {
  id: string

  constructor(id: string) {
    this.id = id
  }
}

export class HomeGroupTitleItem extends HomeCardItem {
  title: string

  constructor(id: string, title: string) {
    super(id)

    this.title = title
  }
}

export class HomeLargeCardItem extends HomeCardItem {
  title: string
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
  enabled: boolean
  variant: OverridableStringUnion<'elevation' | 'outlined', PaperPropsVariantOverrides>
  href: __next_route_internal_types__.RouteImpl<String> | UrlObject

  constructor(
    id: string,
    title: string,
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    href: __next_route_internal_types__.RouteImpl<String> | UrlObject,
    variant: OverridableStringUnion<'elevation' | 'outlined', PaperPropsVariantOverrides> = "filled",
    enabled: boolean = true
  ) {
    super(id)

    this.title = title
    this.Icon = Icon
    this.enabled = enabled
    this.variant = variant
    this.href = href
  }
}

export class HomeMediumCardItem extends HomeLargeCardItem {}

export class HomeHorizontalItemsItem<T> extends HomeCardItem {
  items: T[]
  itemContent: () => React.ReactNode

  constructor(id: string, items: T[], itemContent: () => React.ReactNode) {
    super(id)

    this.items = items
    this.itemContent = itemContent
  }
}

export class HomeCustomItem extends HomeCardItem {
  content: () => React.ReactNode

  constructor(id: string, content: () => React.ReactNode) {
    super(id)

    this.content = content
  }
}