import { CircleProgress } from "@/components/ui/circle-progress"
import RemainingTime from "@/model/multichoicequiz/RemainingTime"

interface ProgressWithTextProps {
  remainingTime: RemainingTime
  maxQuizTime: number
}

export const ProgressWithText: React.FC<ProgressWithTextProps> = ({
  remainingTime,
  maxQuizTime,
}) => {
  return (
    <div className="relative">
      <CircleProgress
        width={150}
        strokeWith={10}
        value={remainingTime.getRemainingPercent(maxQuizTime)}
      />

      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-foreground text-2xl font-bold">
        {remainingTime.toMinuteSecond()}
      </span>
    </div>
  )
}
