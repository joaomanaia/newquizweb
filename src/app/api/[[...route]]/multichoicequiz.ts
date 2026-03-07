import { Hono } from "hono"
import * as z from "zod"
import { getOpenTDBQuestions } from "@/app/api/_data/opentdb"
import { emptyStringToUndefined, zValidator } from "@/lib/zod"
import { categoriesIds } from "@/model/multichoicequiz/MultiChoiceQuestion"
import { convertOpenTDBResultToQuestion } from "@/model/multichoicequiz/OpenTDBQuestionResponse"
import { difficulties } from "@/types/question-difficulty"

const app = new Hono().get(
  "/randomQuestions",
  zValidator(
    "query",
    z.object({
      size: z.coerce.number().min(1).max(50).default(5),
      difficulty: emptyStringToUndefined(z.enum(difficulties).optional()),
      categoryId: emptyStringToUndefined(z.enum(categoriesIds)).optional(),
    })
  ),
  async (c) => {
    const { size, difficulty, categoryId } = c.req.valid("query")

    try {
      const questions = await getOpenTDBQuestions({
        amount: size,
        difficulty: difficulty ?? null,
        categoryId: categoryId ?? null,
      })
      const results = questions.results.map(convertOpenTDBResultToQuestion)

      return c.json({ questions: results }, 200)
    } catch {
      return c.json({ message: "Failed to fetch questions" }, 500)
    }
  }
)

export default app
