import { ListIcon, SmartphoneIcon } from "lucide-react"
import { LargeButton, Title } from "@/components/home-list-components"
import { ANDROID_APP_LINK } from "@/lib/constants"

export const metadata = {
  title: "Home",
}

export default function Page() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-8">
      <h1 className="hidden">Home</h1>
      <LargeButton
        route={ANDROID_APP_LINK}
        title="Install Android Game"
        icon={SmartphoneIcon}
        className="border-border/30 hover:bg-surface-variant/30 border bg-transparent"
      />
      <Title>Multi-Choice Quiz</Title>
      <LargeButton route="/multichoicequiz" title="Play Multi-Choice Quiz" icon={ListIcon} />
    </main>
  )
}
