import { DifficultyRowItems } from "@/components/difficulty-items"
import { PlayRandomQuiz, Title } from "@/components/home-list-components"
import { MainContainer } from "@/components/main-container"
import type QuestionDifficulty from "@/types/question-difficulty"
import type { Route } from "next"

export const metadata = {
  title: "Multi Choice Quiz",
}

interface PageProps {
  searchParams: {
    difficulty?: QuestionDifficulty
  }
}

export default function Page({ searchParams }: PageProps) {
  const multiChoiceQuizRoute = `/multichoicequiz${
    searchParams.difficulty ? `?difficulty=${searchParams.difficulty}` : ""
  }` as Route

  return (
    <MainContainer className="flex h-full flex-col gap-8 items-center justify-center max-sm:rounded-b-none md:mb-3">
      <h1 className="hidden">Multi Choice Quiz</h1>
      <PlayRandomQuiz route={multiChoiceQuizRoute} />
      <Title>Difficulty</Title>
      <DifficultyRowItems />
    </MainContainer>
  )
}
