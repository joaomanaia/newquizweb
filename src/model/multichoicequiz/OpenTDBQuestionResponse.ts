import MultiChoiceQuestion from "./MultiChoiceQuestion"

export default interface OpenTDBQuestionResponse {
  responde_code: number
  results: OpenTDBResult[]
}

export type OpenTDBResult = {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export const convertOpenTDBResultToQuestion = (result: OpenTDBResult): MultiChoiceQuestion => {
  const answers = result.incorrect_answers
  answers.push(result.correct_answer)

  const shuffledAnswers = shuffled(answers)

  return {
    id: crypto.randomUUID(),
    description: result.question,
    category: result.category,
    difficulty: result.difficulty,
    type: result.type,
    answers: shuffledAnswers,
    correctAns: shuffledAnswers.indexOf(result.correct_answer),
  }
}

const shuffled = <T>(array: T[]): T[] => {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}
