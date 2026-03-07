import queryString from "query-string"
import { OPENTDB_FIXTURES } from "@/app/api/_dev/fixtures/opentdb"
import { shouldMockExternalApis } from "@/app/api/_dev/mock-apis"
import type { MultiChoiceCategoryId } from "@/model/multichoicequiz/MultiChoiceQuestion"
import type OpenTDBQuestionResponse from "@/model/multichoicequiz/OpenTDBQuestionResponse"
import type QuestionDifficulty from "@/types/question-difficulty"

const API_URL = "https://opentdb.com/api.php"

export const getOpenTDBQuestions = async ({
  amount = 5,
  difficulty = null,
  categoryId = null,
}: {
  amount?: number
  difficulty?: QuestionDifficulty | null
  categoryId?: MultiChoiceCategoryId | null
}): Promise<OpenTDBQuestionResponse> => {
  if (shouldMockExternalApis()) {
    console.warn("Using fixture data for OpenTDB API")
    return getFixtureQuestions(amount, difficulty)
  }

  return fetchFromOpenTDB({ amount, difficulty, categoryId })
}

const getFixtureQuestions = (
  amount: number,
  difficulty: QuestionDifficulty | null
): OpenTDBQuestionResponse => {
  let results = [...OPENTDB_FIXTURES]

  if (difficulty) {
    const diffBase64 = Buffer.from(difficulty).toString("base64")
    results = results.filter((q) => q.difficulty === diffBase64)
  }

  results.sort(() => Math.random() - 0.5)
  return { responde_code: 0, results: results.slice(0, amount) }
}

const fetchFromOpenTDB = async ({
  amount = 5,
  difficulty = null,
  categoryId = null,
}: {
  amount?: number
  difficulty?: QuestionDifficulty | null
  categoryId?: MultiChoiceCategoryId | null
}): Promise<OpenTDBQuestionResponse> => {
  console.log("Fetching questions from OpenTDB API with params:", {
    amount,
    difficulty,
    categoryId,
  })
  const requestUrl = queryString.stringifyUrl({
    url: API_URL,
    query: {
      encode: "base64",
      amount,
      difficulty,
      category: categoryId,
    },
  })

  const response = await fetch(requestUrl, { cache: "no-store" })

  if (!response.ok) {
    throw new Error("Failed to fetch questions")
  }

  return (await response.json()) as OpenTDBQuestionResponse
}
