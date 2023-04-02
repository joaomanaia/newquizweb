import { MOVIE_DEFAULT_CATEGORY_IMG, TMDB_API_URL } from "@/core/common/BaseUrls"
import { shuffleArray } from "@/core/util/Array"

type TimeWindow = "day" | "week"

type Category = "popularity" | "release-date"

export const getCompQuizMovieQuestions = async (
  timeWindow: TimeWindow,
  category: Category
) => {
  const apiKey = process.env.TMDB_API_KEY
  if (!apiKey) return new Response("No API key found", { status: 500 })

  const maxPages = 500
  const page = Math.floor(Math.random() * maxPages) + 1

  const response = await fetch(`${TMDB_API_URL}/trending/movie/${timeWindow}?api_key=${apiKey}&page=${page}&include_adult=false`)
  const responseData: OpenTDBResponse = await response.json()

  const questions: ComparisonQuizItem[] = responseData.results.map((result) => {
    const imgUrl = "https://image.tmdb.org/t/p/w1280" + result.backdrop_path

    const value = getQuestionValue(result, category)

    return {
      title: result.title,
      value: value,
      imgUrl: result.backdrop_path ? imgUrl : MOVIE_DEFAULT_CATEGORY_IMG,
    }
  })

  // filter out items with the same popularity as the previous item
  const filteredItems = questions.filter((item, index, arr) => {
    if (index === 0) return true
    return item.value !== arr[index - 1].value
  })

  return shuffleArray(filteredItems)
}

const getQuestionValue = (result: OpenTDBResult, category: Category): number => {
  switch (category) {
    case "popularity":
      return result.popularity
    case "release-date":
      return new Date(result.release_date).getTime()
    default:
      throw new Error("Invalid category")
  }
}
