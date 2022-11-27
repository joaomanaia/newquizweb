import { Container, Typography } from "@mui/material"
import { NextPage } from "next"
import { NextSeo } from "next-seo"
import Head from "next/head"
import { useState } from "react"
import RootLayout from "../../components/m3/root-layout"
import QuizStepView from "../../components/multichoicequiz/QuizStepView"
import MultiChoiceQuestionStep, { Completed } from "../../model/multichoicequiz/MultiChoiceQuestionStep"

const MultiChoiceQuizResults: NextPage = () => {
  const [questionSteps, setQuestionSteps] = useState<MultiChoiceQuestionStep[]>([])

  return (
    <div className="w-screen h-screen">
      <Head>
        <title>Results</title>
        <meta name="description" content="Multi choice quiz results" />
        <link rel="icon" href="/favicon.ico" />

        <NextSeo noindex={true} />
      </Head>

      <RootLayout>
        <Container className="flex flex-col h-full items-center justify-center">
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
        </Container>
      </RootLayout>
    </div>
  )
}

export default MultiChoiceQuizResults
