import { TMDB_API_URL } from "@/core/common/BaseUrls"
import { shuffleArray } from "@/core/util/Array"

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

export const getCompQuizMoviePopularityQuestions = async () => {
  const apiKey = process.env.TMDB_API_KEY
  if (!apiKey) return new Response("No API key found", { status: 500 })

  const maxPages = 500
  const page = Math.floor(Math.random() * maxPages) + 1

  const response = await fetch(`${TMDB_API_URL}/discover/movie?api_key=${apiKey}&page=${page}&include_adult=false`)
  const responseData: OpenTDBResponse = await response.json()

  const questions: ComparisonQuizItem[] = responseData.results.map((result) => {
    const imgUrl = "https://image.tmdb.org/t/p/w500" + result.backdrop_path

    return {
      title: result.title,
      value: result.popularity,
      imgUrl: imgUrl,
    }
  })

  return shuffleArray(questions)
}
