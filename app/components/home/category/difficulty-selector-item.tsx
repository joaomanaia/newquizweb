"use client"

import QuestionDifficulty from "@/types/QuestionDifficulty"
import { Card, Palette, useTheme } from "@mui/material"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export type DifficultyWithRandom = QuestionDifficulty | "random"

interface ItemProps {
  difficulty: DifficultyWithRandom
}

const getContainerColor = (difficulty: DifficultyWithRandom, palette: Palette) => {
  switch (difficulty) {
    case "random":
      return palette.primary.main
    case "easy":
      return palette.success.main
    case "medium":
      return palette.warning.main
    case "hard":
      return palette.error.main
  }
}

const getContentColor = (difficulty: DifficultyWithRandom, palette: Palette) => {
  switch (difficulty) {
    case "random":
      return palette.onPrimary.main
    case "easy":
      return palette.onSuccess.main
    case "medium":
      return palette.onWarning.main
    case "hard":
      return palette.onError.main
  }
}

export const DifficultySelectorItem: React.FC<ItemProps> = ({ difficulty }) => {
  const { palette } = useTheme()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selectedDifficulty = (searchParams.get("difficulty") as QuestionDifficulty) ?? "random"
  const selected = selectedDifficulty === difficulty

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const containerColor = getContainerColor(difficulty, palette)
  const contentColor = getContentColor(difficulty, palette)

  return (
    // When selected the card if filled, otherwise it's outlined
    <Link
      className="next-link"
      // @ts-ignore
      href={
        // <pathname>?difficulty=<difficulty>
        difficulty === "random"
          ? pathname
          : `${pathname}?${createQueryString("difficulty", difficulty)}`
      }
    >
      <Card
        className="w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center text-xl lg:text-2xl font-bold cursor-pointer transition"
        sx={{
          color: selected ? contentColor : containerColor,
          backgroundColor: selected ? containerColor : "transparent",
          borderColor: containerColor,
          borderWidth: "2px",
          borderStyle: "solid",
          "&:hover": {
            backgroundColor: containerColor,
            color: contentColor,
          },
        }}
      >
        {difficulty}
      </Card>
    </Link>
  )
}
