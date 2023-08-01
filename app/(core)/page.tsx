import HomeItems from "../components/home/HomeItems"
import { homeCardItems } from "@/data/home-card"

export const metadata = {
  title: "Home",
  description: "Home page",
}

export default function Page() {
  return <HomeItems items={homeCardItems} />
}
