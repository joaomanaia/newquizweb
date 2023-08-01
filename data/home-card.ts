import { InstallMobileRounded, ShuffleRounded } from "@mui/icons-material"
import HomeCardItem, { HomeGroupTitleItem, HomeLargeCardItem } from "../model/HomeCardItem"

const AMAZON_APP_LINK = "https://www.amazon.com/gp/product/B08T8JN4P9"

export const homeCardItems: HomeCardItem[] = [
  new HomeLargeCardItem(
    "install_android_app",
    "Install android game",
    InstallMobileRounded,
    AMAZON_APP_LINK,
    "outlined"
  ),
  new HomeGroupTitleItem("multichoicequiz_title", "Multi choice quiz"),
  new HomeLargeCardItem(
    "multichoicequiz_quickquiz",
    "Quick quiz",
    ShuffleRounded,
    "/multichoicequiz"
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

export const multichoiceItems: HomeCardItem[] = [
  new HomeGroupTitleItem("quickquiz_title", "Quick quiz"),
  new HomeLargeCardItem(
    "multichoicequiz_quickquiz",
    "Quick quiz",
    ShuffleRounded,
    "/multichoicequiz",
    "primary"
  ),
]
