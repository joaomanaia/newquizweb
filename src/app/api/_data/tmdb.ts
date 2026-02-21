import { getTMDBFixturePage } from "@/app/api/_dev/fixtures/tmdb"
import { shouldMockExternalApis } from "@/app/api/_dev/mock-apis"
import { TMDB_API_URL } from "@/core/common/BaseUrls"
import type { TMDBResponse } from "@/types/OpenTDBTypes"

type TimeWindow = "day" | "week"

export const fetchTMDBPage = async (
  mediaType: string,
  timeWindow: TimeWindow,
  page: number,
  apiKey: string | undefined
): Promise<TMDBResponse> => {
  if (shouldMockExternalApis()) {
    console.warn("Using fixture data for TMDB API")
    return getTMDBFixturePage(mediaType === "person" ? "person" : "movie")
  }

  if (!apiKey) throw new Error("Missing TMDB API key")

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
