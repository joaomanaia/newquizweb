import { Button, Container, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import Header from '../components/m3/header/header'

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen">
      <Head>
        <title>NewQuiz</title>
        <meta name="description" content="The perfect game to increase your knowledge." />
        <link rel="icon" href="/favicon.ico" />

        <NextSeo
          title="NewQuiz"
          description="The perfect game to increase your knowledge."/>
      </Head>
      <Header />

      <Container className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-6">
          <Typography variant="h3">NewQuiz for Android</Typography>
          <Button variant='contained'>Download</Button>
        </div>
      </Container>
    </div>
  )
}

export default Home
