import { Box, Button, CircularProgress, Container, Typography } from "@mui/material"
import { NextPage } from "next"
import { NextSeo } from "next-seo"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { delay } from "../app/util/DelayUtil"
import RootLayout from "../components/m3/root-layout"
import AnswerCard from "../components/multichoicequiz/AnswerCard"
import QuizStepView from "../components/multichoicequiz/QuizStepView"
import MultiChoiceQuestion, { decodeBase64Question } from "../model/multichoicequiz/MultiChoiceQuestion"
import MultiChoiceQuestionStep, {
  Completed,
  Current,
  NotCurrent,
} from "../model/multichoicequiz/MultiChoiceQuestionStep"
import RemainingTime from "../model/multichoicequiz/RemainingTime"
import SelectedAnswer from "../model/multichoicequiz/SelectedAnswer"

const MIN_QUIZ_TIME = 0
const MAX_QUIZ_TIME = RemainingTime.MULTI_CHOICE_QUIZ_COUNTDOWN_IN_MILLIS

const normaliseProgressValue = (value: number) =>
  ((value - MIN_QUIZ_TIME) * 100) / (MAX_QUIZ_TIME - MIN_QUIZ_TIME)

const MultiChoiceQuiz: NextPage = () => {
  const router = useRouter()

  const [questionSteps, setQuestionSteps] = useState<MultiChoiceQuestionStep[]>([])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1)
  const currentQuestionStep = questionSteps.at(currentQuestionIndex)
  const currentQuestion = currentQuestionStep?.question

  const [selectedAnswer, setSelectedAnswer] = useState(SelectedAnswer.NONE)
  const [remainingTime, setRemainingTime] = useState(RemainingTime.MAX_VALUE)

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

  useEffect(() => {
    const getQuestions = async (): Promise<MultiChoiceQuestion[]> => {
      const questionsRes = await fetch("/api/multichoicequiz/randomQuestions").then((res) =>
        res.text()
      )
      return JSON.parse(questionsRes).questions
    }

    const generateQuestionSteps = (questions: MultiChoiceQuestion[]): MultiChoiceQuestionStep[] => {
      return questions
        .map(decodeBase64Question)
        .map((question) => new NotCurrent(question))
    }

    getQuestions()
      .then(generateQuestionSteps)
      .then((steps) => setQuestionSteps(steps))
      .then(() => setCurrentQuestionIndex(0))
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
    <div className="w-screen h-screen">
      <Head>
        <title>Multi choice quiz</title>
        <meta name="description" content="Quick quiz - multi choice quiz" />
        <link rel="icon" href="/favicon.ico" />

        <NextSeo noindex={true} />
      </Head>

      <RootLayout>
        <Container className="flex flex-col h-full items-center justify-center space-y-16">
          <ProgressWithText remainingTime={remainingTime} />

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
        </Container>
      </RootLayout>
    </div>
  )
}

interface ProgressWithTextProps {
  remainingTime: RemainingTime
}

const ProgressWithText: React.FC<ProgressWithTextProps> = ({ remainingTime }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        size={80}
        thickness={2}
        variant="determinate"
        value={normaliseProgressValue(remainingTime.value)}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="subtitle1">{remainingTime.toMinuteSecond()}</Typography>
      </Box>
    </Box>
  )
}

export default MultiChoiceQuiz
