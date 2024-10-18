import { createRouteHandlersForAction } from "zsa-openapi"
import { createServerAction } from "zsa"
import { z } from "zod"

const BASE_URL = "http://numbersapi.com/random/"
const MIN_NUMBER = 0
const MAX_NUMBER = 100000

export const getQuestionsAction = createServerAction()
  .input(
    z
      .object({
        min: z.coerce.number().min(MIN_NUMBER).max(MAX_NUMBER).optional().default(MIN_NUMBER),
        max: z.coerce.number().min(MIN_NUMBER).max(MAX_NUMBER).optional().default(MAX_NUMBER),
        size: z.coerce.number().min(1).max(10).optional().default(1),
      })
      .refine((input) => input.min <= input.max, {
        message: "Min number must be less than or equal to max number",
      })
  )
  .handler(async ({ input }) => {
    const { min, max, size } = input

    const promises: Promise<Question>[] = Array.from({ length: size }, () =>
      getRandomNumber(min, max)
    )

    try {
      const numbers = await Promise.all(promises)
      return { questions: numbers }
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

type Question = {
  number: number
  question: string
}

const getRandomNumber = (min: number | null, max: number | null): Promise<Question> => {
  const url =
    min && max ? `${BASE_URL}?min=${min || ""}&max=${max || ""}&json=true` : `${BASE_URL}?json=true`

  return fetch(url, { cache: "no-store" })
    .then((response) => response.json())
    .then((data) => {
      const dataText: string = data.text

      // Remove the data number from the beginning of the string
      const question = dataText.substring(dataText.indexOf(" ") + 1)

      return { number: data.number, question: question }
    })
}
