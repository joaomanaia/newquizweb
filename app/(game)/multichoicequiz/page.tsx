import QuizContent from "./components/QuizContent"
import { getHost } from "../../../core/util/Network"
import MultiChoiceQuestion from "../../../model/multichoicequiz/MultiChoiceQuestion"
import QuestionDifficulty from "@/types/QuestionDifficulty"
import queryString from "query-string"

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
    difficulty?: string
  }
}

export default async function MultiChoiceQuizPage({ searchParams }: MultiChoiceQuizPageProps) {
  const questions = await getQuestions(searchParams.difficulty as QuestionDifficulty)

  return <QuizContent questions={questions} />
}
