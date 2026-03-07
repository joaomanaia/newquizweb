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

export type MultiChoiceCategory = {
  id: MultiChoiceCategoryId
  name: string
  image?: string
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

export const categoriesIds = [
  // OpenTDB categories
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
] as const

export type MultiChoiceCategoryId = (typeof categoriesIds)[number]
