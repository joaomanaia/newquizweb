import QuestionDifficulty from "@/types/question-difficulty"
import queryString from "query-string"
import MultiChoiceQuestion from "@/model/multichoicequiz/MultiChoiceQuestion"
import { getHost } from "@/core/util/Network"
import { QuizContent } from "@/app/(game)/multichoicequiz/components/QuizContent"
import { Metadata } from "next"

export const revalidate = 0

async function getQuestions(difficulty?: QuestionDifficulty): Promise<MultiChoiceQuestion[]> {
  const url = queryString.stringifyUrl({
    url: `${getHost()}/api/multichoicequiz/randomQuestions`,
    query: {
      difficulty: difficulty,
    },
  })

  const res = await fetch(url, {
    cache: "no-store",
  })

  return res
    .json()
    .then((questionsText) => questionsText.questions)
    .catch((e) => {
      console.error(e)
      return []
    })
}

export const dynamic = "force-dynamic"

interface MultiChoiceQuizPageProps {
  searchParams: {
    difficulty?: QuestionDifficulty
  }
}

export const metadata: Metadata = {
  title: "Multi Choice Quiz",
  robots: "noindex, nofollow",
}

export default async function MultiChoiceQuizPage({ searchParams }: MultiChoiceQuizPageProps) {
  const questions = await getQuestions(searchParams.difficulty)

  return <QuizContent questions={questions} />
}
