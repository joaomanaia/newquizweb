import RemainingTime from "@/model/multichoicequiz/RemainingTime"

interface ProgressWithTextProps {
  remainingTime: RemainingTime
  maxQuizTime: number
}

// TODO: Add progress circle back in
export const ProgressWithText: React.FC<ProgressWithTextProps> = ({
  remainingTime,
  maxQuizTime,
}) => {
  return (
    <div className="relative">
      {/* <ProgressCircle
        width={150}
        strokeWith={10}
        value={remainingTime.getRemainingPercent(maxQuizTime)}
      /> */}

      <span className="text-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-2xl font-bold">
        {remainingTime.toMinuteSecond()}
      </span>
    </div>
  )
}
