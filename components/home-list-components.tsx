import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import type { Route } from "next"
import Link from "next/link"

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
        "flex bg-surfaceVariant/60 hover:bg-surfaceVariant/70 flex-col items-start w-full max-w-96 p-4 rounded-2xl transition",
        className
      )}
    >
      <h3 className="text-lg">{title}</h3>
      <Icon className="size-20 md:size-24 mt-2 self-end text-surfaceVariant-foreground/50" />
    </Link>
  )
}

interface PlayRandomQuizProps {
  route: Route
}

export const PlayRandomQuiz: React.FC<PlayRandomQuizProps> = ({ route }) => {
  return (
    <Link href={route} className="flex flex-col items-start gap-6 w-full max-w-96 p-6 rounded-2xl bg-primary/90 hover:bg-primary text-surface transition">
      <h3 className="text-lg font-medium">Quiz with random categories</h3>
      <div className="py-2 px-5 text-sm bg-surface text-surface-foreground rounded-full">
        Random Quiz
      </div>
    </Link>
  )
}
