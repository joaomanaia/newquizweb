import { Container } from "@mui/material"
import HomeCardItemContent from "../(home)/HomeCardItemContent"
import HomeCardItem, { HomeGroupTitleItem, HomeLargeCardItem } from "../../model/HomeCardItem"
import { ShuffleRounded } from "@mui/icons-material"

export default function Page() {
  const homeCardItems: HomeCardItem[] = [
    new HomeGroupTitleItem("quickquiz_title", "Quick quiz"),
    new HomeLargeCardItem(
      "multichoicequiz_quickquiz",
      "Quick quiz",
      ShuffleRounded,
      "/multichoicequiz/game",
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
