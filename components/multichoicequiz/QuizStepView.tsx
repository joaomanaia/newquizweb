import { CheckRounded, CloseRounded } from "@mui/icons-material"
import { Card, Typography } from "@mui/material"

interface QuizStepViewProps {
  position: number
  current: boolean
  correct: boolean
  completed: boolean
}

const QuizStepView: React.FC<QuizStepViewProps> = ({ position, current, correct, completed }) => {
  return (
    <Card
      className="w-8 h-8 flex items-center justify-center rounded-full cursor-default"
      variant={current ? "tertiary" : "filled"}
    >
      {current || !completed ? <Typography>{position}</Typography> : <StepIcon correct={correct} />}
    </Card>
  )
}

interface StepIconProps {
  correct: boolean
}

const StepIcon: React.FC<StepIconProps> = ({ correct }) => {
  return correct ? <CheckRounded /> : <CloseRounded />
}

export default QuizStepView
