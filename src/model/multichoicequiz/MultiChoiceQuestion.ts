import { decodeBase64String } from "@/core/util/StringUtil"

export default interface MultiChoiceQuestion {
  id: string
  description: string
  answers: string[]
  category: string
  correctAns: number
  type: string
  difficulty: string
}

export const decodeBase64Question = (question: MultiChoiceQuestion): MultiChoiceQuestion => {
  return {
    id: question.id,
    description: decodeBase64String(question.description),
    answers: question.answers.map(decodeBase64String),
    category: decodeBase64String(question.category),
    correctAns: question.correctAns,
    type: decodeBase64String(question.type),
    difficulty: decodeBase64String(question.difficulty),
  }
}
