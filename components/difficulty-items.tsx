"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { SignalHighIcon } from "lucide-react"
import { parseAsStringLiteral, useQueryState } from "nuqs"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type QuestionDifficulty from "@/types/question-difficulty"
import { difficulties } from "@/types/question-difficulty"

export function DifficultyRowItems() {
  const [selectedDifficulty, setSelectedDifficulty] = useQueryState(
    "difficulty",
    parseAsStringLiteral(difficulties)
  )

  return (
    <div className="flex w-full items-center gap-x-4 overflow-x-auto md:justify-center">
      <DifficultyItem
        difficulty="random"
        selected={selectedDifficulty === null}
        onClick={() => setSelectedDifficulty(null)}
      />
      {difficulties.map((difficulty) => (
        <DifficultyItem
          key={difficulty}
          difficulty={difficulty}
          selected={selectedDifficulty === difficulty}
          onClick={() => setSelectedDifficulty(difficulty)}
        />
      ))}
    </div>
  )
}

const difficultyItemVariants = cva(
  "flex flex-col min-w-32 gap-3 items-start py-3 px-4 rounded-2xl bg-transparent text-inherit border-2 transition cursor-pointer",
  {
    variants: {
      difficulty: {
        random:
          "border-primary text-primary aria-selected:border-primary-container aria-selected:text-primary-container-foreground aria-selected:bg-primary-container hover:bg-primary/10",
        easy: "border-easy text-easy aria-selected:bg-easy aria-selected:text-easy-foreground hover:bg-easy/10",
        medium:
          "border-medium text-medium aria-selected:bg-medium aria-selected:text-medium-foreground hover:bg-medium/10",
        hard: "border-hard text-hard aria-selected:bg-hard aria-selected:text-hard-foreground hover:bg-hard/10",
      },
    },
    defaultVariants: {
      difficulty: "random",
    },
  }
)

type DifficultyItemVariantsType = VariantProps<typeof difficultyItemVariants>

interface DifficultyItemProps extends DifficultyItemVariantsType {
  difficulty: QuestionDifficulty | "random"
  selected?: boolean
  onClick?: () => void
}

const DifficultyItem: React.FC<DifficultyItemProps> = ({ difficulty, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-selected={selected}
      role="option"
      className={cn(difficultyItemVariants({ difficulty }))}
    >
      {getDifficultyName(difficulty)}
      <SignalHighIcon className="size-9 self-end" />
    </button>
  )
}

const getDifficultyName = (difficulty: QuestionDifficulty | "random") => {
  switch (difficulty) {
    case "easy":
      return "Easy"
    case "medium":
      return "Medium"
    case "hard":
      return "Hard"
    default:
      return "Random"
  }
}

export function DifficultyRowItemsSkeleton() {
  return (
    <div className="flex w-full items-center gap-x-4 overflow-x-auto md:justify-center">
      <Skeleton className="h-25 w-32 rounded-2xl" />
      <Skeleton className="h-25 w-32 rounded-2xl" />
      <Skeleton className="h-25 w-32 rounded-2xl" />
      <Skeleton className="h-25 w-32 rounded-2xl" />
    </div>
  )
}
