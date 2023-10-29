import { getMultichoiceItems } from "@/data/home-card"
import HomeItems from "../../../components/home/HomeItems"
import QuestionDifficulty from "@/types/QuestionDifficulty"

export const metadata = {
  title: "Multi Choice Quiz",
  description: "Multi Choice Quiz",
}

interface PageProps {
  searchParams: {
    difficulty?: string
  }
}

export default function Page({ searchParams }: PageProps) {
  const selectedDifficulty = (searchParams.difficulty as QuestionDifficulty) ?? undefined

  return <HomeItems items={getMultichoiceItems(selectedDifficulty)} />
}
