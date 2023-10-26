import QuizContent from "./components/QuizContent"
import { getHost } from "../../../core/util/Network"
import MultiChoiceQuestion from "../../../model/multichoicequiz/MultiChoiceQuestion"

export const revalidate = 0

async function getQuestions(): Promise<MultiChoiceQuestion[]> {
  const res = await fetch(`${getHost()}/api/multichoicequiz/randomQuestions`, { cache: 'no-store' })

  return res
    .json()
    .then((questionsText) => questionsText.questions)
    .catch((e) => {
      console.error(e)
      return []
    })
}

export const dynamic = "force-dynamic"

export default async function MultiChoiceQuizPage() {
  const questions = await getQuestions()

  return <QuizContent questions={questions} />
}
