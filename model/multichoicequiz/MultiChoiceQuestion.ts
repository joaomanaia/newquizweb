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
    description: atob(question.description),
    answers: question.answers.map(atob),
    category: atob(question.category),
    correctAns: question.correctAns,
    type: atob(question.type),
    difficulty: atob(question.difficulty),
  }
}