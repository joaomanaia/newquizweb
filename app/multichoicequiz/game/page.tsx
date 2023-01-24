import QuizContent from "../../../components/multichoicequiz/QuizContent"
import { getHost } from "../../../core/util/Network"
import MultiChoiceQuestion from "../../../model/multichoicequiz/MultiChoiceQuestion"

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

export default async function MultiChoiceQuizPage() {
  const questions = await getQuestions()

  return <QuizContent questions={questions} />
}
