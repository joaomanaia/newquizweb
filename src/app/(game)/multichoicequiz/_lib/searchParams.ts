import "server-only"
import { createLoader, parseAsStringLiteral } from "nuqs/server"
import { difficulties } from "@/types/question-difficulty"

export const multichoicequizSearchParams = createLoader({
  difficulty: parseAsStringLiteral(difficulties),
})
