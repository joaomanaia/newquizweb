"use client"

import { QuizStepView } from "@/app/(game)/multichoicequiz/components/QuizStepView"
import { Button } from "@/components/ui/button"
import { Completed, countCorrectQuestions } from "@/model/multichoicequiz/MultiChoiceQuestionStep"
import { useRouter } from "next/navigation"

interface QuizResultsContentProps {
  completedSteps: Completed[]
}

export const QuizResultsContent: React.FC<QuizResultsContentProps> = ({ completedSteps }) => {
  const correctQuestions = countCorrectQuestions(completedSteps)

  const router = useRouter()
  const navigateToHome = () => router.back()

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-y-8">
      <p className="text-4xl">
        {correctQuestions}/{completedSteps.length} Correct
      </p>

      <div className="flex space-x-2">
        {completedSteps.map((step, index) => (
          <QuizStepView
            key={step.question.id}
            position={index + 1}
            current={false}
            correct={step.correct}
            completed={true}
          />
        ))}
      </div>

      <div className="flex space-x-2">
        <Button onClick={navigateToHome}>Back</Button>
      </div>
    </div>
  )
}
