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
        "bg-surface-variant/60 hover:bg-surface-variant/70 flex w-full max-w-96 flex-col items-start rounded-2xl p-4 transition",
        className
      )}
    >
      <h3 className="text-lg">{title}</h3>
      <Icon className="text-surface-variant-foreground/50 mt-2 size-20 self-end md:size-24" />
    </Link>
  )
}

interface PlayRandomQuizProps {
  route: Route
}

export const PlayRandomQuiz: React.FC<PlayRandomQuizProps> = ({ route }) => {
  return (
    <Link
      href={route}
      className="bg-primary/90 hover:bg-primary text-surface flex w-full max-w-96 flex-col items-start gap-6 rounded-2xl p-6 transition"
    >
      <h3 className="text-lg font-medium">Quiz with random categories</h3>
      <div className="bg-surface text-surface-foreground rounded-full px-5 py-2 text-sm">
        Random Quiz
      </div>
    </Link>
  )
}
