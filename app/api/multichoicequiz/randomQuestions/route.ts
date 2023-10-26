import { NextResponse } from "next/server"
import OpenTDBQuestionResponse, {
  convertOpenTDBResultToQuestion,
} from "@/model/multichoicequiz/OpenTDBQuestionResponse"
import QuestionDifficulty from "@/types/QuestionDifficulty"
import queryString from "query-string"

const API_URL = "https://opentdb.com/api.php"

export const revalidate = 0

export async function GET() {
  try {
    const questions = await getOpenTDBQuestions()

    const openTDBResponse = questions.results
    const results = openTDBResponse.map(convertOpenTDBResultToQuestion)

    return NextResponse.json({ questions: results })
  } catch (e: unknown) {
    return new NextResponse("An error occurred: " + e, { status: 500 })
  }
}

const getOpenTDBQuestions = async (
  amount: number = 5,
  difficulty: QuestionDifficulty | null = null
): Promise<OpenTDBQuestionResponse> => {
  const requestUrl = queryString.stringifyUrl({
    url: API_URL,
    query: {
      encode: "base64",
      amount: amount,
      difficulty: difficulty,
    },
  })

  const res = await fetch(requestUrl, {
    cache: "no-store",
  })
  const textRes = await res.text()
  return JSON.parse(textRes)
}
