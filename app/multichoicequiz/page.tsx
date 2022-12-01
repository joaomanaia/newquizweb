import QuizContent from "../../components/multichoicequiz/QuizContent"
import { getHost } from "../../core/util/Network"

async function getQuestions() {
  const res = await fetch(getHost() + "/api/multichoicequiz/randomQuestions")

  return res.text().then((questionsText) => JSON.parse(questionsText).questions)
}

export default async function Page() {
  const questions = await getQuestions()

  return <QuizContent questions={questions} />
}
