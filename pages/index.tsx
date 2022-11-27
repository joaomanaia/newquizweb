import { InstallMobileRounded, ShuffleRounded } from '@mui/icons-material'
import { Container } from '@mui/material'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import HomeCardItemContent from '../components/home/HomeCardItemContent'
import RootLayout from '../components/m3/root-layout'
import HomeCardItem, { HomeGroupTitleItem, HomeLargeCardItem } from '../model/HomeCardItem'

const Home: NextPage = () => {

  const router = useRouter()

  const navigateToAndroidAppStore = () => router.push("https://www.amazon.com/gp/product/B08T8JN4P9")
  const navigateToQuickMultiChoiceQuiz = () => router.push("/multichoicequiz")

  const homeCardItems: HomeCardItem[] = [
    new HomeLargeCardItem(
      "install_android_app", 
      "Install android game",
      InstallMobileRounded,
      navigateToAndroidAppStore,
      "outlined"
    ),
    new HomeGroupTitleItem("multichoicequiz_title", "Multi choice quiz"),
    new HomeLargeCardItem(
      "multichoicequiz_quickquiz", 
      "Quick quiz",
      ShuffleRounded,
      navigateToQuickMultiChoiceQuiz
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

  return (
    <div className="w-screen h-screen">
      <Head>
        <title>NewQuiz</title>
        <meta name="description" content="The perfect game to increase your knowledge." />
        <link rel="icon" href="/favicon.ico" />

        <NextSeo
          title="NewQuiz"
          description="The perfect game to increase your knowledge."/>
      </Head>

      <RootLayout>
        <Container className="flex flex-col h-full items-center justify-center space-y-4">
          {homeCardItems.map(item => <HomeCardItemContent key={item.id} item={item} />)}
        </Container>
      </RootLayout>
    </div>
  )
}

export default Home
