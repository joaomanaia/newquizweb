"use client"

import { useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cva, type VariantProps } from "class-variance-authority"
import { SignalHighIcon } from "lucide-react"
import { type Route } from "next"
import { cn } from "@/lib/utils"
import type QuestionDifficulty from "@/types/question-difficulty"

interface DifficultyRowItemsProps {}

export const DifficultyRowItems: React.FC<DifficultyRowItemsProps> = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedDifficulty: QuestionDifficulty | "random" = useMemo(() => {
    const difficulty = searchParams.get("difficulty")
    return difficulty === null ? "random" : (difficulty as QuestionDifficulty)
  }, [searchParams])

  const setDifficulty = (difficulty: QuestionDifficulty | "random") => {
    const params = new URLSearchParams(searchParams.toString())

    if (difficulty === "random") {
      params.delete("difficulty")
    } else {
      params.set("difficulty", difficulty)
    }

    const url = pathname + "?" + params.toString()
    router.push(url as Route)
  }

  return (
    <div className="flex w-full items-center gap-x-4 overflow-x-auto md:justify-center">
      <DifficultyItem
        difficulty="random"
        selected={selectedDifficulty === "random"}
        onClick={() => setDifficulty("random")}
      />
      <DifficultyItem
        difficulty="easy"
        selected={selectedDifficulty === "easy"}
        onClick={() => setDifficulty("easy")}
      />
      <DifficultyItem
        difficulty="medium"
        selected={selectedDifficulty === "medium"}
        onClick={() => setDifficulty("medium")}
      />
      <DifficultyItem
        difficulty="hard"
        selected={selectedDifficulty === "hard"}
        onClick={() => setDifficulty("hard")}
      />
    </div>
  )
}

const difficultyItemVariants = cva(
  "flex flex-col min-w-32 gap-3 items-start py-3 px-4 rounded-2xl bg-transparent text-inherit border-2 transition",
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
