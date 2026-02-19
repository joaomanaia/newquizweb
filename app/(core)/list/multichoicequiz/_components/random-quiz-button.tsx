"use client"

import { useMemo } from "react"
import Link from "next/link"
import type { Route } from "next"
import { parseAsStringLiteral, useQueryState } from "nuqs"
import queryString from "query-string"
import { Skeleton } from "@/components/ui/skeleton"
import { difficulties } from "@/types/question-difficulty"

export function PlayRandomQuiz() {
  const [selectedDifficulty] = useQueryState("difficulty", parseAsStringLiteral(difficulties))

  const multiChoiceQuizRoute = useMemo(() => {
    return queryString.stringifyUrl({
      url: "/multichoicequiz" as Route,
      query: {
        difficulty: selectedDifficulty || undefined,
      },
    }) as Route
  }, [selectedDifficulty])

  return (
    <Link
      href={multiChoiceQuizRoute}
      className="bg-primary/90 hover:bg-primary text-surface flex w-full max-w-96 flex-col items-start gap-6 rounded-2xl p-6 transition"
    >
      <h3 className="text-lg font-medium">Quiz with random categories</h3>
      <div className="bg-surface text-surface-foreground rounded-full px-5 py-2 text-sm">
        Random Quiz
      </div>
    </Link>
  )
}

export function PlayRandomQuizSkeleton() {
  return <Skeleton className="h-34 w-full max-w-96 rounded-2xl" />
}
