import HomeItems from "../../components/home/HomeItems"
import { multichoiceItems } from "../../../data/home-card"

export default function Page() {
  return <HomeItems items={multichoiceItems} />
}
