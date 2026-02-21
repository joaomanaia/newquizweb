import { Metadata } from "next"
import { multichoicequizSearchParams } from "@/app/(game)/multichoicequiz/_lib/searchParams"
import { QuizContent } from "@/app/(game)/multichoicequiz/components/QuizContent"
import { client } from "@/lib/hono"
import type MultiChoiceQuestion from "@/model/multichoicequiz/MultiChoiceQuestion"
import type QuestionDifficulty from "@/types/question-difficulty"

export const revalidate = 0
export const dynamic = "force-dynamic"

async function getQuestions(
  difficulty: QuestionDifficulty | null
): Promise<MultiChoiceQuestion[] | Error> {
  const res = await client.api.multichoicequiz.randomQuestions.$get({
    query: {
      difficulty: difficulty ?? [],
    },
  })

  if (!res.ok) {
    const error = await res
      .json()
      .then((data) => data.message || "An error occurred while fetching questions.")
    return new Error(error)
  }

  return res.json().then((data) => data.questions)
}

export const metadata: Metadata = {
  title: "Multi Choice Quiz",
  robots: "noindex, nofollow",
}

export default async function MultiChoiceQuizPage(props: PageProps<"/multichoicequiz">) {
  const { difficulty } = await multichoicequizSearchParams(props.searchParams)
  const questions = await getQuestions(difficulty)

  if (questions instanceof Error) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-destructive text-center">{questions.message}</p>
      </div>
    )
  }

  return <QuizContent questions={questions} />
}
