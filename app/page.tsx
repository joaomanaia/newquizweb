"use client"

import { InstallMobileRounded, ShuffleRounded } from "@mui/icons-material"
import { Container } from "@mui/material"
import { useRouter } from "next/navigation"
import HomeCardItemContent from "../components/home/HomeCardItemContent"
import HomeCardItem, { HomeGroupTitleItem, HomeLargeCardItem } from "../model/HomeCardItem"

const AMAZON_APP_LINK = "https://www.amazon.com/gp/product/B08T8JN4P9"

export default function Page() {
  const router = useRouter()

  const navigateToAndroidAppStore = () => router.push(AMAZON_APP_LINK)
  const navigateToQuickMultiChoiceQuiz = () => router.push("/multichoicequiz")

  const homeCardItems: HomeCardItem[] = [
    new HomeLargeCardItem(
      "install_android_app",
      "Install android game",
      InstallMobileRounded,
      navigateToAndroidAppStore,
      "outlined"
    ),
    new HomeGroupTitleItem("multichoicequiz_title", "Multi choice quiz"),
    new HomeLargeCardItem(
      "multichoicequiz_quickquiz",
      "Quick quiz",
      ShuffleRounded,
      navigateToQuickMultiChoiceQuiz
    ),
    /*
    new HomeGroupTitleItem("wordle_title", "Wordle"),
    new HomeLargeCardItem(
      "wordle_infinite", 
      "Wordle infinite",
      ShuffleRounded,
      () => {}
    ),
    */
  ]

  return (
    <Container className="flex flex-col h-full items-center justify-center space-y-4">
      {homeCardItems.map((item) => (
        <HomeCardItemContent key={item.id} item={item} />
      ))}
    </Container>
  )
}
