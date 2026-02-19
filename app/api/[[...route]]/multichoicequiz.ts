import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import queryString from "query-string"
import * as z from "zod"
import { emptyStringToUndefined } from "@/lib/zod"
import type OpenTDBQuestionResponse from "@/model/multichoicequiz/OpenTDBQuestionResponse"
import { convertOpenTDBResultToQuestion } from "@/model/multichoicequiz/OpenTDBQuestionResponse"
import type QuestionDifficulty from "@/types/question-difficulty"
import { difficulties } from "@/types/question-difficulty"

const API_URL = "https://opentdb.com/api.php"

const app = new Hono().get(
  "/randomQuestions",
  zValidator(
    "query",
    z.object({
      size: z.coerce.number().min(1).max(50).default(5),
      difficulty: emptyStringToUndefined(z.enum(difficulties).optional()),
    })
  ),
  async (c) => {
    const { size, difficulty } = c.req.valid("query")

    try {
      const questions = await getOpenTDBQuestions(size, difficulty ?? null)
      const results = questions.results.map(convertOpenTDBResultToQuestion)

      return c.json({ questions: results }, 200)
    } catch {
      return c.json({ message: "Failed to fetch questions" }, 500)
    }
  }
)

const getOpenTDBQuestions = async (
  amount: number = 5,
  difficulty: QuestionDifficulty | null = null
): Promise<OpenTDBQuestionResponse> => {
  const requestUrl = queryString.stringifyUrl({
    url: API_URL,
    query: {
      encode: "base64",
      amount,
      difficulty,
    },
  })

  const response = await fetch(requestUrl, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch questions")
  }

  return (await response.json()) as OpenTDBQuestionResponse
}

export default app
