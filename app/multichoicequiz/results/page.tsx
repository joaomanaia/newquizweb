import { Typography } from "@mui/material"
import QuizStepView from "../../../components/multichoicequiz/QuizStepView"
import MultiChoiceQuestionStep, { Completed } from "../../../model/multichoicequiz/MultiChoiceQuestionStep"

export default function Page() {
  const questionSteps: MultiChoiceQuestionStep[] = []

  return (
    <>
      <Typography variant="h3">Congratulations</Typography>

      <Typography variant="h5">2/5 Correct</Typography>

      <div className="flex space-x-2">
        {questionSteps.map((step, index) => (
          <QuizStepView
            key={step.question.id}
            position={index + 1}
            current={false}
            correct={step instanceof Completed && step.correct}
            completed={step instanceof Completed}
          />
        ))}
      </div>
    </>
  )
}
