import { MOVIE_DEFAULT_CATEGORY_IMG, TMDB_API_URL } from "@/core/common/BaseUrls"
import { shuffleArray } from "@/core/util/Array"
import { ComparisonQuizMovieCategory } from "@/types/ComparisonQuizTypes"
import type { TMDBResponse, MovieTMDBResult, PeopleTMDBResult } from "@/types/OpenTDBTypes"

type TimeWindow = "day" | "week"

const BASE_IMG_URL = "https://image.tmdb.org/t/p/w1280"

export const getCompQuizMovieQuestions = async (
  timeWindow: TimeWindow,
  category: ComparisonQuizMovieCategory
): Promise<ComparisonQuizItem[]> => {
  const apiKey = process.env.TMDB_API_KEY
  if (!apiKey) throw new Error("Missing TMDB API key")

  const maxPages = 500
  const page = Math.floor(Math.random() * maxPages) + 1

  const mediaType = category.includes("actor") ? "person" : "movie"

  const url = new URL(`${TMDB_API_URL}/trending/${mediaType}/${timeWindow}`)
  url.searchParams.append("api_key", apiKey)
  url.searchParams.append("page", page.toString())
  url.searchParams.append("include_adult", "false")

  const response = await fetch(url)
  const responseData: TMDBResponse = await response.json()

  const questions: ComparisonQuizItem[] = responseData.results.map((result) => {
    switch (result.media_type) {
      case "movie": {
        const imgUrl = BASE_IMG_URL + result.backdrop_path

        const value = getMovieQuestionValue(result, category)

        return {
          title: result.title,
          value: value,
          imgUrl: result.backdrop_path ? imgUrl : MOVIE_DEFAULT_CATEGORY_IMG,
        }
      }
      case "person": {
        const imgUrl = BASE_IMG_URL + result.profile_path

        const value = getActorQuestionValue(result, category)

        return {
          title: result.name,
          value: value,
          imgUrl: result.profile_path ? imgUrl : MOVIE_DEFAULT_CATEGORY_IMG,
        }
      }
      default:
        throw new Error("Invalid result")
    }
  })

  // filter out items with the same popularity as the previous item
  const filteredItems = questions.filter((item, index, arr) => {
    if (index === 0) return true
    return item.value !== arr[index - 1].value
  })

  return shuffleArray(filteredItems)
}

const getMovieQuestionValue = (
  result: MovieTMDBResult,
  category: ComparisonQuizMovieCategory
): number => {
  switch (category) {
    case "movie-popularity":
      return result.popularity
    case "movie-release-date":
      return new Date(result.release_date).getTime()
    default:
      throw new Error("Invalid movie category")
  }
}

const getActorQuestionValue = (
  result: PeopleTMDBResult,
  category: ComparisonQuizMovieCategory
): number => {
  switch (category) {
    case "movie-actor-popularity":
      return result.popularity
    default:
      throw new Error("Invalid actor category")
  }
}
