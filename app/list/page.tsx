import { homeCardItems } from "../../data/home-card"
import HomeItems from "../components/home/HomeItems"

export default function Page() {
  return <HomeItems items={homeCardItems} />
}
