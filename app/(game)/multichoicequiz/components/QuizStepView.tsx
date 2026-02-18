import { CheckIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuizStepViewProps {
  position: number
  current: boolean
  correct: boolean
  completed: boolean
}

export const QuizStepView: React.FC<QuizStepViewProps> = ({
  position,
  current,
  correct,
  completed,
}) => {
  return (
    <div
      className={cn(
        "flex size-8 cursor-default items-center justify-center rounded-full",
        current
          ? "bg-tertiary text-tertiary-foreground"
          : "bg-surface-variant text-surface-variant-foreground"
      )}
    >
      {current || !completed ? <span>{position}</span> : <StepIcon correct={correct} />}
    </div>
  )
}

interface StepIconProps {
  correct: boolean
}

const StepIcon: React.FC<StepIconProps> = ({ correct }) => {
  return correct ? <CheckIcon className="size-5" /> : <XIcon className="size-5" />
}
