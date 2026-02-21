import MultiChoiceQuestion from "./MultiChoiceQuestion"
import SelectedAnswer from "./SelectedAnswer"

export default interface MultiChoiceQuestionStep {
  question: MultiChoiceQuestion

  asCurrent: () => Current
}

export class NotCurrent implements MultiChoiceQuestionStep {
  question: MultiChoiceQuestion

  constructor(question: MultiChoiceQuestion) {
    this.question = question
  }

  asCurrent(): Current {
    return new Current(this.question)
  }

  changeToCurrent(): Current {
    return new Current(this.question)
  }
}

export class Current implements MultiChoiceQuestionStep {
  question: MultiChoiceQuestion

  constructor(question: MultiChoiceQuestion) {
    this.question = question
  }

  asCurrent(): Current {
    return new Current(this.question)
  }

  changeToCompleted(correct: boolean, selectedAnswer: SelectedAnswer): Completed {
    return new Completed(this.question, correct, selectedAnswer)
  }
}

export class Completed implements MultiChoiceQuestionStep {
  question: MultiChoiceQuestion
  correct: boolean
  selectedAnswer: SelectedAnswer

  constructor(
    question: MultiChoiceQuestion,
    correct: boolean,
    selectedAnswer: SelectedAnswer = SelectedAnswer.NONE
  ) {
    this.question = question
    this.correct = correct
    this.selectedAnswer = selectedAnswer
  }

  asCurrent(): Current {
    return new Current(this.question)
  }
}

export const isAllCompleted = (list: MultiChoiceQuestionStep[]): boolean => {
  return list.every((step) => step instanceof Completed)
}

export const countCorrectQuestions = (list: Completed[]): number => {
  return list.filter((step) => step.correct).length
}
