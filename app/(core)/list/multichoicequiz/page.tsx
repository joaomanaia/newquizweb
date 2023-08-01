import { multichoiceItems } from "@/data/home-card"
import HomeItems from "../../../components/home/HomeItems"

export const metadata = {
  title: "Multi Choice Quiz",
  description: "Multi Choice Quiz",
}

export default function Page() {
  return <HomeItems items={multichoiceItems} />
}
