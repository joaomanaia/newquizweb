import "server-only"
import { createLoader, parseAsStringLiteral } from "nuqs/server"
import { categoriesIds } from "@/model/multichoicequiz/MultiChoiceQuestion"
import { difficulties } from "@/types/question-difficulty"

export const multichoicequizSearchParams = createLoader({
  difficulty: parseAsStringLiteral(difficulties),
  categoryId: parseAsStringLiteral(categoriesIds),
})
