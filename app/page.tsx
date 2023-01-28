"use client"

import { StartRounded } from "@mui/icons-material"
import { Card, Container, Typography } from "@mui/material"
import NextLink from "next/link"

export default function MainPage() {
  return (
    <Container className="w-screen h-screen flex flex-col lg:flex-row items-center text-center justify-center space-y-8">
      <Typography variant="h1">Welcome to NewQuiz</Typography>

      <NextLink
        href="/list"
        passHref
        className="text-inherit bg-inherit decoration-transparent text-start"
      >
        <Card variant="primary">
          <div className="p-2 cursor-pointer w-96">
            <Typography variant="h6">Start NewQuiz</Typography>
            <div className="flex w-full mt-2 justify-end">
              <StartRounded className="h-24 w-24" />
            </div>
          </div>
        </Card>
      </NextLink>
    </Container>
  )
}
