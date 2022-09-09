export default interface MultiChoiceQuestion {
  id: string
  description: string
  answers: string[]
  category: string
  correctAns: number
  type: string
  difficulty: string
}
