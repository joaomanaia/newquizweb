import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import * as z from "zod"
import { comparisonQuizCategories } from "@/types/ComparisonQuizTypes"

const app = new Hono().get(
  "/:category",
  zValidator("param", z.object({ category: z.enum(comparisonQuizCategories) })),
  zValidator(
    "query",
    z.object({
      size: z.coerce.number().min(2).max(100).default(30),
    })
  ),
  async (c) => {
    const { category } = c.req.valid("param")
    const { size } = c.req.valid("query")

    try {
      const data = await getDataForCategory(category, size)
      return c.json(data)
    } catch {
      return c.json({ message: "Failed to fetch data for the requested category" }, 500)
    }
  }
)

async function getDataForCategory(category: string, size: number) {
  switch (category) {
    // Country categories
    case "country-population":
    case "country-area": {
      const { getCompQuizCountryQuestions } = await import("./data/RestCountries")
      return await getCompQuizCountryQuestions(category, size)
    }
    // Movie categories
    case "movie-popularity":
    case "movie-release-date":
    case "movie-actor-popularity": {
      const { getCompQuizMovieQuestions } = await import("./data/Movie")
      return await getCompQuizMovieQuestions("week", category, size)
    }
    case "club-trophies":
    case "club-foundation-date":
    case "club-stadium-capacity":
    case "club-stadium-opened-date": {
      const { getClubFootballQuestions } = await import("./data/ClubFootball")
      return await getClubFootballQuestions(category, size)
    }
    default: {
      // This case should never happen because of the zod validation
      throw new Error("Invalid category")
    }
  }
}

export default app
