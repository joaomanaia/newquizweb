"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar"
import { Button } from "@/components/ui/button"
import { QuizStepView } from "@/app/(game)/multichoicequiz/components/QuizStepView"
import { cn } from "@/lib/utils"
import MultiChoiceQuestion, {
  decodeBase64Question,
} from "@/model/multichoicequiz/MultiChoiceQuestion"
import MultiChoiceQuestionStep, {
  Completed,
  NotCurrent,
} from "@/model/multichoicequiz/MultiChoiceQuestionStep"
import RemainingTime from "@/model/multichoicequiz/RemainingTime"
import SelectedAnswer from "@/model/multichoicequiz/SelectedAnswer"

const MAX_QUIZ_TIME = 30_000 // 30 seconds

const QuizResultsContent = dynamic(() =>
  import("@/app/(game)/multichoicequiz/components/QuizResultsContent").then(
    (module) => module.QuizResultsContent
  )
)

const generateQuestionSteps = (questions: MultiChoiceQuestion[]): NotCurrent[] => {
  return questions.map(decodeBase64Question).map((question) => new NotCurrent(question))
}

interface QuizContentProps {
  questions: MultiChoiceQuestion[]
}

export const QuizContent: React.FC<QuizContentProps> = ({ questions }) => {
  const [questionSteps, setQuestionSteps] = useState<MultiChoiceQuestionStep[]>(() =>
    generateQuestionSteps(questions)
  )
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isQuizEnded, setQuizEnded] = useState(false)

  const [selectedAnswer, setSelectedAnswer] = useState(SelectedAnswer.NONE)
  const [remainingTime, setRemainingTime] = useState(RemainingTime.fromValue(MAX_QUIZ_TIME))

  const currentQuestion = questionSteps.at(currentQuestionIndex)?.question

  // Count down timer
  useEffect(() => {
    if (isQuizEnded) return

    if (remainingTime.isEnded()) {
      verifyQuestion()
      return
    }

    const timer = setTimeout(() => {
      setRemainingTime((prevRemainingTime) =>
        prevRemainingTime.isEnded() ? RemainingTime.ZERO : prevRemainingTime.decreaseValue(1000)
      )
    }, 1000)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTime, isQuizEnded])

  const nextQuestion = () => {
    setSelectedAnswer(SelectedAnswer.NONE)

    // Check if quiz is ended
    if (currentQuestionIndex + 1 >= questionSteps.length) {
      setCurrentQuestionIndex(-1)
      setTimeout(() => {
        setQuizEnded(true)
      }, 1500)
      return
    }

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    setRemainingTime(RemainingTime.fromValue(MAX_QUIZ_TIME))
  }

  const verifyQuestion = () => {
    setQuestionSteps(updateSteps)
    nextQuestion()
  }

  const updateSteps = (prevSteps: MultiChoiceQuestionStep[]): MultiChoiceQuestionStep[] => {
    if (currentQuestionIndex < 0) {
      return prevSteps
    }

    const nextSteps = [...prevSteps]
    const currentStep = nextSteps[currentQuestionIndex].asCurrent()

    const answerCorrect = currentStep.question.correctAns === selectedAnswer.index
    nextSteps[currentQuestionIndex] = currentStep.changeToCompleted(answerCorrect, selectedAnswer)

    const nextIndex = currentQuestionIndex + 1

    if (nextIndex < nextSteps.length) {
      nextSteps[nextIndex] = nextSteps[nextIndex].asCurrent()
    }

    return nextSteps
  }

  if (isQuizEnded) {
    return <QuizResultsContent completedSteps={questionSteps as Completed[]} />
  }

  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center gap-8 p-4">
      <AnimatedCircularProgressBar
        value={remainingTime.value}
        min={0}
        max={MAX_QUIZ_TIME}
        gaugePrimaryColor={
          remainingTime.getRemainingPercent(MAX_QUIZ_TIME) > 0.3
            ? "var(--color-primary)"
            : "var(--color-destructive)"
        }
        gaugeSecondaryColor="var(--color-surface-variant)"
        formatText={() => remainingTime.toMinuteSecond()}
        className="size-20 text-lg lg:size-24 lg:text-2xl"
      />

      <div className="mb-8 flex gap-x-2">
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

      <h2 className="max-w-xl text-center text-lg lg:mx-8">{currentQuestion?.description}</h2>

      <div className="flex w-full flex-col gap-y-4 md:w-1/2 lg:w-1/3">
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
        disabled={selectedAnswer.isNone()}
        onClick={verifyQuestion}
        className="w-full md:w-1/2 lg:w-1/3"
      >
        Verify
      </Button>
    </div>
  )
}

interface AnswerCardProps {
  text: string
  selected?: boolean
  onClick: () => void
}

const AnswerCard: React.FC<AnswerCardProps> = ({ text, selected, onClick }) => {
  return (
    <Button
      variant={selected ? "default" : "outline"}
      aria-selected={selected}
      onClick={onClick}
      className={cn("h-14 justify-start rounded-md text-start", !selected && "text-foreground")}
    >
      {text}
    </Button>
  )
}
