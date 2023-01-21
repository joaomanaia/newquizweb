"use client"

import { Button, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { logGameStart } from "../../core/logging_analytics/multichoice_analytics"
import { delay } from "../../core/util/DelayUtil"
import MultiChoiceQuestion, {
  decodeBase64Question,
} from "../../model/multichoicequiz/MultiChoiceQuestion"
import MultiChoiceQuestionStep, {
  Completed,
  NotCurrent,
} from "../../model/multichoicequiz/MultiChoiceQuestionStep"
import RemainingTime from "../../model/multichoicequiz/RemainingTime"
import SelectedAnswer from "../../model/multichoicequiz/SelectedAnswer"
import AnswerCard from "./AnswerCard"
import ProgressWithText from "./ProgressWithText"
import QuizStepView from "./QuizStepView"

const MIN_QUIZ_TIME = 0
const MAX_QUIZ_TIME = RemainingTime.MULTI_CHOICE_QUIZ_COUNTDOWN_IN_MILLIS

const generateQuestionSteps = (questions: MultiChoiceQuestion[]): NotCurrent[] => {
  return questions.map(decodeBase64Question).map((question) => new NotCurrent(question))
}

interface QuizContentProps {
  questions: MultiChoiceQuestion[]
}

const QuizContent: React.FC<QuizContentProps> = ({ questions }) => {
  const [questionSteps, setQuestionSteps] = useState<MultiChoiceQuestionStep[]>([])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1)

  const [selectedAnswer, setSelectedAnswer] = useState(SelectedAnswer.NONE)
  const [remainingTime, setRemainingTime] = useState(RemainingTime.MAX_VALUE)

  const currentQuestion = questionSteps.at(currentQuestionIndex)?.question

  const router = useRouter()

  useEffect(() => {
    if (remainingTime.isEnded()) {
      verifyQuestion()
    } else {
      const timer = setInterval(() => {
        setRemainingTime((prevRemainingTime) =>
          prevRemainingTime.isEnded() ? RemainingTime.ZERO : prevRemainingTime.decreaseValue(1000)
        )
      }, 1000)

      return () => clearInterval(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTime])

  // Start
  useEffect(() => {
    setQuestionSteps(generateQuestionSteps(questions))
    setCurrentQuestionIndex(0)

    logGameStart(questions.length)
  }, [])

  const nextQuestion = async () => {
    setSelectedAnswer(SelectedAnswer.NONE)

    if (currentQuestionIndex + 1 >= questionSteps.length) {
      setCurrentQuestionIndex(-1)

      await delay(1500)

      router.back()
      return
    }

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    setRemainingTime(RemainingTime.MAX_VALUE)
  }

  const verifyQuestion = () => {
    setQuestionSteps(updateSteps)
    nextQuestion()
  }

  const updateSteps = (prevSteps: MultiChoiceQuestionStep[]): MultiChoiceQuestionStep[] => {
    const currentStep = prevSteps[currentQuestionIndex].asCurrent()

    const answerCorrect = currentStep.question.correctAns === selectedAnswer.index
    prevSteps[currentQuestionIndex] = currentStep.changeToCompleted(answerCorrect, selectedAnswer)

    const nextIndex = currentQuestionIndex + 1

    if (nextIndex < prevSteps.length) {
      prevSteps[nextIndex] = prevSteps[nextIndex].asCurrent()
    }

    return prevSteps
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-16">
      <ProgressWithText
        remainingTime={remainingTime}
        minQuizTime={MIN_QUIZ_TIME}
        maxQuizTime={MAX_QUIZ_TIME}
      />

      <div className="flex space-x-2">
        {questionSteps.map((step, index) => (
          <QuizStepView
            key={step.question.id}
            position={index + 1}
            current={currentQuestionIndex === index}
            correct={step instanceof Completed && step.correct}
            completed={step instanceof Completed}
          />
        ))}
      </div>

      <Typography variant="h4">{currentQuestion?.description}</Typography>

      <div className="w-96 space-y-4">
        {currentQuestion?.answers?.map((answer, index) => (
          <AnswerCard
            key={answer}
            text={answer}
            selected={selectedAnswer.index === index}
            onClick={() => setSelectedAnswer(SelectedAnswer.fromIndex(index))}
          />
        ))}
      </div>

      <Button
        variant="contained"
        disabled={selectedAnswer.isNone()}
        onClick={verifyQuestion}
        className="w-96"
      >
        Verify
      </Button>
    </div>
  )
}

export default QuizContent
