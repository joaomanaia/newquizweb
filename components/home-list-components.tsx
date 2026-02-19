import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import type { Route } from "next"
import { cn } from "@/lib/utils"

interface TitleProps {
  children: React.ReactNode
}

export const Title: React.FC<TitleProps> = ({ children }) => {
  return <h2 className="text-3xl font-bold">{children}</h2>
}

interface LargeButtonProps {
  route: Route
  title: string
  icon: LucideIcon
  className?: string
}

export const LargeButton: React.FC<LargeButtonProps> = ({
  route,
  title,
  icon: Icon,
  className,
}) => {
  return (
    <Link
      href={route}
      className={cn(
        "bg-surface-variant/60 hover:bg-surface-variant/70 flex w-full max-w-96 flex-col items-start rounded-2xl p-6 transition",
        className
      )}
    >
      <h3 className="text-lg">{title}</h3>
      <Icon className="text-surface-variant-foreground/50 mt-2 size-16 self-end md:size-20" />
    </Link>
  )
}
