import { createLoader, parseAsStringLiteral } from "nuqs/server"
import { difficulties } from "@/types/question-difficulty"

export const multichoiceQuizSearchParams = createLoader({
  difficulty: parseAsStringLiteral(difficulties),
})
