import type { Route } from "next"
import { DifficultyRowItems } from "@/components/difficulty-items"
import { PlayRandomQuiz, Title } from "@/components/home-list-components"
import type QuestionDifficulty from "@/types/question-difficulty"

export const metadata = {
  title: "Multi Choice Quiz",
}

interface PageProps {
  searchParams: Promise<{
    difficulty?: QuestionDifficulty
  }>
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams
  const multiChoiceQuizRoute = `/multichoicequiz${
    searchParams.difficulty ? `?difficulty=${searchParams.difficulty}` : ""
  }` as Route

  return (
    <main className="flex h-full flex-col items-center justify-center gap-8">
      <h1 className="hidden">Multi Choice Quiz</h1>
      <PlayRandomQuiz route={multiChoiceQuizRoute} />
      <Title>Difficulty</Title>
      <DifficultyRowItems />
    </main>
  )
}
