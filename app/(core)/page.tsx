import { LargeButton, Title } from "@/components/home-list-components"
import { MainContainer } from "@/components/main-container"
import { ANDROID_APP_LINK } from "@/lib/constants"
import { ListIcon, SmartphoneIcon } from "lucide-react"

export const metadata = {
  title: "Home",
}

export default function Page() {
  return (
    <MainContainer className="flex h-full flex-col gap-8 items-center justify-center max-sm:rounded-b-none md:mb-3">
      <h1 className="hidden">Home</h1>
      <LargeButton
        route={ANDROID_APP_LINK}
        title="Install Android Game"
        icon={SmartphoneIcon}
        className="border border-border/30 bg-transparent hover:bg-surfaceVariant/30"
      />
      <Title>Multi-Choice Quiz</Title>
      <LargeButton route="/multichoicequiz" title="Play Multi-Choice Quiz" icon={ListIcon} />
    </MainContainer>
  )
}
