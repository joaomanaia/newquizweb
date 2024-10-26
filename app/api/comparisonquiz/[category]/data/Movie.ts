import { MOVIE_DEFAULT_CATEGORY_IMG, TMDB_API_URL } from "@/core/common/BaseUrls"
import { shuffleArray } from "@/core/util/Array"
import type { MovieCategory } from "@/types/ComparisonQuizTypes"
import type { TMDBResponse, MovieTMDBResult, PeopleTMDBResult } from "@/types/OpenTDBTypes"

type TimeWindow = "day" | "week"

const BASE_IMG_URL = "https://image.tmdb.org/t/p/w1280"

// This cannot be changed
const TMDB_RESULTS_PER_PAGE = 20
const TMDB_MAX_PAGES = 500

export const getCompQuizMovieQuestions = async (
  timeWindow: TimeWindow,
  category: MovieCategory,
  size: number
): Promise<ComparisonQuizItem[]> => {
  const questions = await fetchTMDBQuestionData(timeWindow, category, size)

  // filter out items with the same popularity as the previous item
  const filteredItems = questions.filter((item, index, arr) => {
    if (index === 0) return true
    return item.value !== arr[index - 1].value
  })

  return shuffleArray(filteredItems).slice(0, size)
}

const fetchTMDBQuestionData = async (
  timeWindow: TimeWindow,
  category: MovieCategory,
  size: number
): Promise<ComparisonQuizItem[]> => {
  const apiKey = process.env.TMDB_API_KEY
  if (!apiKey) throw new Error("Missing TMDB API key")

  const pagesNeeded = Math.ceil(size / TMDB_RESULTS_PER_PAGE)
  if (pagesNeeded > TMDB_MAX_PAGES) {
    throw new Error("Requested size is too large")
  }

  const usedPages = new Set<number>()

  const fetchPromises: Promise<TMDBResponse>[] = [];
  for (let i = 0; i < pagesNeeded; i++) {
    let page: number

    do {
      page = Math.floor(Math.random() * TMDB_MAX_PAGES) + 1
    } while (usedPages.has(page))
    usedPages.add(page)

    const mediaType = category.includes("actor") ? "person" : "movie"

    const pagePromise = fetchTMDBPage(mediaType, timeWindow, page, apiKey)
    fetchPromises.push(pagePromise)
  }

  const responses = await Promise.all(fetchPromises)
  return responses.flatMap((response) => getFormatedResponseData(response, category))
}

const fetchTMDBPage = async (
  mediaType: string,
  timeWindow: TimeWindow,
  page: number,
  apiKey: string
): Promise<TMDBResponse> => {
  const url = new URL(`${TMDB_API_URL}/trending/${mediaType}/${timeWindow}`)
  url.searchParams.append("api_key", apiKey)
  url.searchParams.append("page", page.toString())
  url.searchParams.append("include_adult", "false")

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch data from TMDB: ${response.statusText}`)
  }
  return response.json()
}

const getFormatedResponseData = (
  responseData: TMDBResponse,
  category: MovieCategory
): ComparisonQuizItem[] => {
  return responseData.results.map((result) => {
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
}

const getMovieQuestionValue = (result: MovieTMDBResult, category: MovieCategory): number => {
  switch (category) {
    case "movie-popularity":
      return result.popularity
    case "movie-release-date":
      return new Date(result.release_date).getTime()
    default:
      throw new Error("Invalid movie category")
  }
}

const getActorQuestionValue = (result: PeopleTMDBResult, category: MovieCategory): number => {
  switch (category) {
    case "movie-actor-popularity":
      return result.popularity
    default:
      throw new Error("Invalid actor category")
  }
}
