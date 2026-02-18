import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import queryString from "query-string"
import * as z from "zod"

const BASE_URL = "http://number-trivia.com/random/"
const MIN_NUMBER = 0
const MAX_NUMBER = 100000

const app = new Hono().get(
  "/random",
  zValidator(
    "query",
    z
      .object({
        min: z.coerce.number().min(MIN_NUMBER).max(MAX_NUMBER).default(MIN_NUMBER),
        max: z.coerce.number().min(MIN_NUMBER).max(MAX_NUMBER).default(MAX_NUMBER),
        size: z.coerce.number().min(1).max(10).default(1),
      })
      .refine((input) => input.min <= input.max, {
        error: "Min number must be less than or equal to max number",
      })
  ),
  async (c) => {
    const { min, max, size } = c.req.valid("query")

    const promises: Promise<Question>[] = Array.from({ length: size }, () =>
      getRandomNumber(min, max)
    )

    try {
      const numbers = await Promise.all(promises)
      return c.json({ questions: numbers })
    } catch {
      return c.json({ message: "Failed to fetch questions" }, 500)
    }
  }
)

type Question = {
  number: number
  question: string
}

const getRandomNumber = async (min: number | null, max: number | null): Promise<Question> => {
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
  return { number: data.number, question: question }
}

export default app
