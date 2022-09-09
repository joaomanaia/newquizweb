import { Box, CircularProgress, Container, Typography } from "@mui/material"
import { NextPage } from "next"
import { NextSeo } from "next-seo"
import Head from "next/head"
import { useEffect, useState } from "react"
import RootLayout from "../components/m3/root-layout"
import AnswerCard from "../components/multichoicequiz/AnswerCard"
import MultiChoiceQuestion from "../model/multichoicequiz/MultiChoiceQuestion"
import MultiChoiceQuestionStep, {
  NotCurrent,
} from "../model/multichoicequiz/MultiChoiceQuestionStep"
import RemainingTime from "../model/multichoicequiz/RemainingTime"
import SelectedAnswer from "../model/multichoicequiz/SelectedAnswer"

const MIN_QUIZ_TIME = 0
const MAX_QUIZ_TIME = RemainingTime.MULTI_CHOICE_QUIZ_COUNTDOWN_IN_MILLIS

const normaliseProgressValue = (value: number) =>
  ((value - MIN_QUIZ_TIME) * 100) / (MAX_QUIZ_TIME - MIN_QUIZ_TIME)

const MultiChoiceQuiz: NextPage = () => {
  const [questionSteps, setQuestionSteps] = useState<MultiChoiceQuestionStep[]>([])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1)
  const currentQuestion = questionSteps.at(currentQuestionIndex)?.question

  const [selectedAnswer, setSelectedAnswer] = useState(SelectedAnswer.NONE)
  const [remainingTime, setRemainingTime] = useState(RemainingTime.MAX_VALUE)

  useEffect(() => {
    if (remainingTime.isEnded()) {
      // Next question

      // If there is not more questions return
      if (currentQuestionIndex + 1 >= questionSteps.length) return

      // Set the values to next question
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      setRemainingTime(RemainingTime.MAX_VALUE)
    } else {
      const timer = setInterval(() => {
        setRemainingTime((prevRemainingTime) =>
          prevRemainingTime.isEnded() ? RemainingTime.ZERO : prevRemainingTime.decreaseValue(1000)
        )
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [currentQuestionIndex, questionSteps.length, remainingTime])

  useEffect(() => {
    const getQuestions = async (): Promise<MultiChoiceQuestion[]> => {
      const questionsRes = await fetch("/api/multichoicequiz/randomQuestions").then((res) =>
        res.text()
      )
      return JSON.parse(questionsRes).questions
    }

    const generateQuestionSteps = (questions: MultiChoiceQuestion[]): MultiChoiceQuestionStep[] => {
      return questions.map((question) => new NotCurrent(question))
    }

    getQuestions()
      .then(generateQuestionSteps)
      .then((steps) => setQuestionSteps(steps))
      .then(() => setCurrentQuestionIndex(0))
  }, [])

  return (
    <div className="w-screen h-screen">
      <Head>
        <title>Multi choice quiz</title>
        <meta name="description" content="Quick quiz - multi choice quiz" />
        <link rel="icon" href="/favicon.ico" />

        <NextSeo noindex={true} />
      </Head>

      <RootLayout>
        <Container className="flex flex-col h-full items-center justify-center space-y-4">
          <ProgressWithText remainingTime={remainingTime} />

          <Typography variant="h4">{currentQuestion?.description}</Typography>

          {currentQuestion?.answers?.map((answer) => (
            <AnswerCard
              key={answer}
              text={answer}
              selected={false}
              onClick={() => {}}/>
          ))}
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
