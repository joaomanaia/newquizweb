import type { NextApiRequest, NextApiResponse } from "next"
import OpenTDBQuestionResponse, {
  convertOpenTDBResultToQuestion,
} from "../../../app/model/OpenTDBQuestionResponse"
import MultiChoiceQuestion from "../../../model/multichoicequiz/MultiChoiceQuestion"

const API_URL = "https://opentdb.com/api.php"

const getOpenTDBQuestions2 = async (amount: number = 5): Promise<OpenTDBQuestionResponse> => {
  const requestUrl = `${API_URL}?encode=base64&amount=${amount}`

  const textRes = await fetch(requestUrl).then((res) => res.text())
  return JSON.parse(textRes)
}

const getOpenTDBQuestions = async (amount: number = 5): Promise<OpenTDBQuestionResponse> => {
  return {
    responde_code: 2,
    results: [
      {
        category: "c",
        question: "Who made NewQuiz?",
        incorrect_answers: ["A", "B", "C"],
        correct_answer: "D",
        type: "t",
        difficulty: "easy"
      },
      {
        category: "c",
        question: "Hello?",
        incorrect_answers: ["A", "B", "C"],
        correct_answer: "D",
        type: "t",
        difficulty: "easy"
      }
    ]
  }
}

type Data = {
  questions: MultiChoiceQuestion[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  getOpenTDBQuestions()
    .then((openTDBResponse) => openTDBResponse.results)
    .then((results) => results.map(convertOpenTDBResultToQuestion))
    .then((questions) => res.status(200).json({ questions: questions }))
    .catch((e) => res.status(404).send(e))
}
