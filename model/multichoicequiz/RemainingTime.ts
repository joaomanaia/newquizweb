export default class RemainingTime {
  value: number

  constructor(value: number) {
    this.value = value
  }

  static ZERO = new RemainingTime(0)

  static fromValue = (value: number): RemainingTime => new RemainingTime(value)

  static MULTI_CHOICE_QUIZ_COUNTDOWN_IN_MILLIS = 30000

  static MAX_VALUE = RemainingTime.fromValue(this.MULTI_CHOICE_QUIZ_COUNTDOWN_IN_MILLIS)

  getRemainingPercent(): number {
    return this.value / RemainingTime.MULTI_CHOICE_QUIZ_COUNTDOWN_IN_MILLIS
  }

  toMinuteSecond(): string {
    const minutes = (this.value / 1000) / 60
    const seconds = (this.value / 1000) % 60

    return minutes.toFixed() === "0" ? seconds.toString() : `${minutes}:${seconds}`
  }

  decreaseValue(value: number): RemainingTime {
    return RemainingTime.fromValue(this.value - value)
  }

  isEnded(): boolean {
    return this.value <= 0
  }
}
