"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { QuizStepView } from "@/app/(game)/multichoicequiz/components/QuizStepView"
import { Completed, countCorrectQuestions } from "@/model/multichoicequiz/MultiChoiceQuestionStep"

interface QuizResultsContentProps {
  completedSteps: Completed[]
}

export const QuizResultsContent: React.FC<QuizResultsContentProps> = ({ completedSteps }) => {
  const correctQuestions = countCorrectQuestions(completedSteps)
  const totalQuestions = completedSteps.length
  const incorrectQuestions = totalQuestions - correctQuestions
  const scorePercent =
    totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0

  const router = useRouter()
  const navigateToHome = () => router.back()

  return (
    <div className="container mx-auto flex h-screen w-screen items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl">Quiz Completed</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2 text-center">
            <p className="text-4xl font-semibold md:text-5xl">{scorePercent}%</p>
            <p className="text-muted-foreground text-base md:text-lg">
              {correctQuestions}/{totalQuestions} correct • {incorrectQuestions} wrong
            </p>
          </div>

          <div className="bg-muted/40 rounded-lg p-4">
            <p className="mb-3 text-center text-sm font-medium">Question Breakdown</p>
            <div className="flex flex-wrap justify-center gap-2">
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
          </div>
        </CardContent>

        <CardFooter className="justify-center">
          <Button onClick={navigateToHome} className="w-full min-w-40 sm:w-auto">
            Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
