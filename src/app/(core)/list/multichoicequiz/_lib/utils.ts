import type { Route } from "next"
import queryString from "query-string"
import type { MultiChoiceCategory } from "@/model/multichoicequiz/MultiChoiceQuestion"
import type QuestionDifficulty from "@/types/question-difficulty"

export function getQuizRoute({
  difficulty,
  categoryId,
}: {
  difficulty?: QuestionDifficulty | null
  categoryId?: MultiChoiceCategory["id"] | null
}) {
  return queryString.stringifyUrl({
    url: "/multichoicequiz" as Route,
    query: {
      difficulty: difficulty || undefined,
      categoryId: categoryId || undefined,
    },
  }) as Route
}
