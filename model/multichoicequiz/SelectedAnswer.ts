import MultiChoiceQuestion from "./MultiChoiceQuestion"

export default class SelectedAnswer {
  index: number

  private constructor(index: number) {
    this.index = index
  }

  static NONE = new this(2)

  static fromIndex = (index: number): SelectedAnswer => new SelectedAnswer(index)

  isNone(): boolean {
    return this.index === -1
  }

  isSelected(): boolean {
    return !this.isNone()
  }

  isCorrect(question: MultiChoiceQuestion): boolean {
    return !this.isNone && question.correctAns === this.index
  }
}
