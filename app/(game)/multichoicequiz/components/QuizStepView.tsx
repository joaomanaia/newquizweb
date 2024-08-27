import { cn } from "@/lib/utils"
import { CheckIcon, XIcon } from "lucide-react"

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
        "size-8 flex items-center justify-center rounded-full cursor-default",
        current
          ? "bg-tertiary text-tertiary-foreground"
          : "bg-surfaceVariant text-surfaceVariant-foreground"
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
