"use client"

import { Container } from "@mui/material"
import { useRouter } from "next/navigation"
import HomeCardItemContent from "../../components/home/HomeCardItemContent"
import HomeCardItem, { HomeGroupTitleItem, HomeLargeCardItem } from "../../model/HomeCardItem"
import { ShuffleRounded } from "@mui/icons-material"

export default function Page() {
  const router = useRouter()

  const navigateToQuickMultiChoiceQuiz = () => router.push("/multichoicequiz/game")

  const homeCardItems: HomeCardItem[] = [
    new HomeGroupTitleItem("quickquiz_title", "Quick quiz"),
    new HomeLargeCardItem(
      "multichoicequiz_quickquiz",
      "Quick quiz",
      ShuffleRounded,
      navigateToQuickMultiChoiceQuiz,
      "primary"
    ),
  ]

  return (
    <Container className="flex flex-col h-full items-center justify-center space-y-4">
      {homeCardItems.map((item) => (
        <HomeCardItemContent key={item.id} item={item} />
      ))}
    </Container>
  )
}
