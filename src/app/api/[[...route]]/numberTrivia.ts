import { Hono } from "hono"
import * as z from "zod"
import { getRandomNumberTrivia } from "@/app/api/_data/number-trivia"
import { zValidator } from "@/lib/zod"

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

    const promises = Array.from({ length: size }, () => getRandomNumberTrivia(min, max))

    try {
      const numbers = await Promise.all(promises)
      return c.json({ questions: numbers })
    } catch {
      return c.json({ message: "Failed to fetch questions" }, 500)
    }
  }
)

export default app
