import { Suspense } from "react"
import type { Metadata } from "next"
import {
  CategoryListComponent,
  CategoryListSkeleton,
} from "@/app/(core)/list/multichoicequiz/_components/category-component"
import {
  PlayRandomQuiz,
  PlayRandomQuizSkeleton,
} from "@/app/(core)/list/multichoicequiz/_components/random-quiz-button"
import { DifficultyRowItems, DifficultyRowItemsSkeleton } from "@/components/difficulty-items"
import { Title } from "@/components/home-list-components"

export const metadata: Metadata = {
  title: "Multi Choice Quiz",
}

export default function Page() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-8">
      <h1 className="hidden">Multi Choice Quiz</h1>
      <Suspense fallback={<PlayRandomQuizSkeleton />}>
        <PlayRandomQuiz />
      </Suspense>
      <Title>Difficulty</Title>
      <Suspense fallback={<DifficultyRowItemsSkeleton />}>
        <DifficultyRowItems />
      </Suspense>
      <Title>Categories</Title>
      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryListComponent />
      </Suspense>
    </main>
  )
}
