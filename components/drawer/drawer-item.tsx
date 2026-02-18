import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetClose } from "@/components/ui/sheet"
import { NavDrawerItemType } from "@/components/drawer/types"
import { cn } from "@/lib/utils"

interface DrawerItemProps {
  item: NavDrawerItemType
  selected?: boolean
  usingSheet?: boolean
  className?: string
}

export const DrawerItem: React.FC<DrawerItemProps> = ({
  item,
  selected,
  usingSheet,
  className,
}) => {
  if (item.disabled) {
    return (
      <DrawerButton item={item} selected={selected} usingSheet={usingSheet} className={className} />
    )
  }

  return (
    <Link
      href={item.route}
      className={cn(item.disabled && "cursor-default", className)}
      aria-disabled={item.disabled}
      itemProp="url"
      passHref
    >
      <DrawerButton item={item} selected={selected} usingSheet={usingSheet} />
    </Link>
  )
}

interface DrawerButtonProps {
  item: NavDrawerItemType
  selected?: boolean
  usingSheet?: boolean
  className?: string
}

const DrawerButton: React.FC<DrawerButtonProps> = ({ item, selected, usingSheet, className }) => {
  return (
    <DrawerButtonContainer usingSheet={usingSheet}>
      <Button
        variant="ghost"
        disabled={item.disabled}
        aria-selected={selected}
        className={cn(
          "text-foreground w-full justify-start gap-2 py-6 text-[16px] font-normal",
          selected && "bg-primary/25 hover:bg-primary/30 text-primary font-bold",
          className
        )}
      >
        <item.Icon fill={selected ? "currentColor" : "none"} fillOpacity={selected ? 0.28 : 0} />
        {item.title}
      </Button>
    </DrawerButtonContainer>
  )
}

interface DrawerButtonContainerProps {
  usingSheet?: boolean
  children: React.ReactNode
}

const DrawerButtonContainer: React.FC<DrawerButtonContainerProps> = ({ usingSheet, children }) => {
  return usingSheet ? <SheetClose render={<>{children}</>} /> : <>{children}</>
}
