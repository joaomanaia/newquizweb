import OpenTDBQuestionResponse, {
  convertOpenTDBResultToQuestion,
} from "@/model/multichoicequiz/OpenTDBQuestionResponse"
import queryString from "query-string"
import type QuestionDifficulty from "@/types/question-difficulty"
import { createServerAction } from "zsa"
import { z } from "zod"
import { difficulties } from "@/types/question-difficulty"
import { createRouteHandlersForAction } from "zsa-openapi"

const API_URL = "https://opentdb.com/api.php"

export const revalidate = 0

const getQuestionsAction = createServerAction()
  .input(
    z.object({
      size: z.coerce.number().min(1).max(50).optional().default(5),
      difficulty: z.enum(difficulties).optional(),
    })
  )
  .handler(async ({ input }) => {
    const { size, difficulty } = input

    try {
      const questions = await getOpenTDBQuestions(size, difficulty)

      const openTDBResponse = questions.results
      const results = openTDBResponse.map(convertOpenTDBResultToQuestion)

      return { questions: results }
    } catch (error) {
      throw new Error("Failed to fetch questions")
    }
  })

export const { GET } = createRouteHandlersForAction(getQuestionsAction, {
  shapeError: (error) => {
    return {
      message: error.message,
      code: error.code,
    }
  },
})

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
