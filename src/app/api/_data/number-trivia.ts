import queryString from "query-string"
import { NUMBER_TRIVIA_FIXTURES } from "@/app/api/_dev/fixtures/number-trivia"
import { shouldMockExternalApis } from "@/app/api/_dev/mock-apis"

const BASE_URL = "http://number-trivia.com/random/"

export type NumberTriviaQuestion = {
  number: number
  question: string
}

export const getRandomNumberTrivia = async (
  min: number | null,
  max: number | null
): Promise<NumberTriviaQuestion> => {
  if (shouldMockExternalApis()) {
    console.warn("Using fixture data for number trivia API")
    return getFixtureTrivia(min, max)
  }

  return fetchFromNumbersAPI(min, max)
}

const getFixtureTrivia = (min: number | null, max: number | null): NumberTriviaQuestion => {
  const filtered = NUMBER_TRIVIA_FIXTURES.filter(
    (t) => (min == null || t.number >= min) && (max == null || t.number <= max)
  )
  const entry = filtered[Math.floor(Math.random() * filtered.length)] ?? NUMBER_TRIVIA_FIXTURES[0]
  return { number: entry.number, question: entry.question }
}

const fetchFromNumbersAPI = async (
  min: number | null,
  max: number | null
): Promise<NumberTriviaQuestion> => {
  const url = queryString.stringifyUrl({
    url: BASE_URL,
    query: {
      min: min || undefined,
      max: max || undefined,
      json: true,
    },
  })

  const response = await fetch(url, { cache: "no-store" })
  const data = await response.json()
  const dataText: string = data.text
  // Remove the data number from the beginning of the string
  const question = dataText.substring(dataText.indexOf(" ") + 1)
  return { number: data.number, question }
}
