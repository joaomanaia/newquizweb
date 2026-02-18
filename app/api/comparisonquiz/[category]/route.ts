import * as z from "zod"
import { createServerAction, ZSAError } from "zsa"
import { createRouteHandlersForAction } from "zsa-openapi"
import { comparisonQuizCategories } from "@/types/ComparisonQuizTypes"

const getQuestionsAction = createServerAction()
  .input(
    z.object({
      category: z.enum(comparisonQuizCategories),
      size: z.coerce.number().min(2).max(100).default(30),
    })
  )
  .handler(async ({ input }) => {
    const { category, size } = input

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
        throw new ZSAError("NOT_FOUND", "Invalid category")
      }
    }
  })

export const { GET } = createRouteHandlersForAction(getQuestionsAction, {
  shapeError: (error) => {
    return {
      message: error.message,
      code: error.code,
    }
  },
})
