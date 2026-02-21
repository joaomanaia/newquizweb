export default class RemainingTime {
  value: number

  constructor(value: number) {
    this.value = value
  }

  static ZERO = new RemainingTime(0)

  static fromValue = (value: number): RemainingTime => new RemainingTime(value)

  isZero(): boolean {
    return this.value === 0
  }

  getRemainingPercent(maxTime: number): number {
    return this.value / maxTime
  }

  toMinuteSecond(): string {
    const minutes = Math.floor((this.value / 1000) / 60)
    const seconds = (this.value / 1000) % 60

    return Math.floor(minutes) === 0 ? seconds.toString() : `${minutes}:${seconds}`
  }

  decreaseValue(value: number): RemainingTime {
    return RemainingTime.fromValue(this.value - value)
  }

  isEnded(): boolean {
    return this.value <= 0
  }
}
