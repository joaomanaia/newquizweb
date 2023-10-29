import { InstallMobileRounded, ShuffleRounded } from "@mui/icons-material"
import HomeCardItem, {
  HomeGroupTitleItem,
  HomeHorizontalItemsItem,
  HomeLargeCardItem,
} from "../model/HomeCardItem"
import {
  DifficultySelectorItem,
  DifficultyWithRandom,
} from "@/app/components/home/category/difficulty-selector-item"
import QuestionDifficulty from "@/types/QuestionDifficulty"

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

export const getMultichoiceItems = (selectedDifficulty?: QuestionDifficulty): HomeCardItem[] => [
  new HomeGroupTitleItem("quickquiz_title", "Quick quiz"),
  new HomeLargeCardItem(
    "multichoicequiz_quickquiz",
    "Quick quiz",
    ShuffleRounded,
    selectedDifficulty ? `/multichoicequiz?difficulty=${selectedDifficulty}` : "/multichoicequiz",
    "primary"
  ),
  new HomeGroupTitleItem("difficulty_selector_title", "Difficulty"),
  new HomeHorizontalItemsItem<DifficultyWithRandom>(
    "multichoicequiz_difficulty_selector",
    ["random", "easy", "medium", "hard"],
    (item) => <DifficultySelectorItem difficulty={item} />,
    "flex space-x-4"
  ),
]
