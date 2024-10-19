export const difficulties = ["easy", "medium", "hard"] as const

type QuestionDifficulty = typeof difficulties[number]

export default QuestionDifficulty
