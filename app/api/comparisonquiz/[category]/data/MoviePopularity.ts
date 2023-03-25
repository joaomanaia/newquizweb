import { TMDB_API_URL } from "@/core/common/BaseUrls"
import { shuffleArray } from "@/core/util/Array"

const categoryImage = "https://firebasestorage.googleapis.com/v0/b/newquiz-app.appspot.com/o/Illustrations%2Fmovie_popularity_illustration.png?alt=media&token=9e54b03f-391a-4cd9-9a04-e0a8f29d0b9f"

export interface OpenTDBResponse {
  page: number
  results: OpenTDBResult[]
  total_pages: number
  total_results: number
}

export interface OpenTDBResult {
  backdrop_path: string
  id: number
  popularity: number
  title: string
}

type TimeWindow = "day" | "week"

export const getCompQuizMoviePopularityQuestions = async (timeWindow: TimeWindow) => {
  const apiKey = process.env.TMDB_API_KEY
  if (!apiKey) return new Response("No API key found", { status: 500 })

  const maxPages = 500
  const page = Math.floor(Math.random() * maxPages) + 1

  const response = await fetch(`${TMDB_API_URL}/trending/movie/${timeWindow}?api_key=${apiKey}&page=${page}&include_adult=false`)
  const responseData: OpenTDBResponse = await response.json()

  const questions: ComparisonQuizItem[] = responseData.results.map((result) => {
    const imgUrl = "https://image.tmdb.org/t/p/w1280" + result.backdrop_path

    return {
      title: result.title,
      value: result.popularity,
      imgUrl: result.backdrop_path ? imgUrl : categoryImage,
    }
  })

  // filter out items with the same popularity as the previous item
  const filteredItems = questions.filter((item, index, arr) => {
    if (index === 0) return true
    return item.value !== arr[index - 1].value
  })

  return shuffleArray(filteredItems)
}
