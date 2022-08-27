import { Button, Container, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/m3/header/header'

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen">
      <Head>
        <title>NewQuiz</title>
        <meta name="description" content="NewQuiz" />
        <link rel="icon" href="/favicon.ico" />
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
