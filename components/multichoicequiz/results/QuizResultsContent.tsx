"use client"

import { Button } from "@mui/material"
import { Completed, countCorrectQuestions } from "../../../model/multichoicequiz/MultiChoiceQuestionStep"
import QuizStepView from "../QuizStepView"
import { useRouter } from "next/navigation"

interface QuizResultsContentProps {
    completedSteps: Completed[]
}

const QuizResultsContent: React.FC<QuizResultsContentProps> = ({ completedSteps }) => {

    const correctQuestions = countCorrectQuestions(completedSteps)

    const router = useRouter()
    const navigateToHome = () => router.back()

    return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
            <p className="text-5xl">{correctQuestions}/{completedSteps.length} Correct</p>

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
                <Button onClick={navigateToHome} variant="contained">
                    Back
                </Button>
            </div>
        </div>
    )
}

export default QuizResultsContent