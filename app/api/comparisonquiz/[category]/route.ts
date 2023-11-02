import { ComparisonQuizCategory } from "@/types/ComparisonQuizTypes"

export async function GET(request: Request, { params }: { params: { category: string } }) {
  const category = params.category as ComparisonQuizCategory

  switch (category) {
    // Country categories
    case "country-population":
    case "country-area": {
      const { getCompQuizCountryAreaQuestions } = await import("./data/RestCountries")
      const questions = await getCompQuizCountryAreaQuestions("country-population")

      // @ts-ignore
      return Response.json(questions)
    }
    // Movie categories
    case "movie-popularity":
    case "movie-release-date":
    case "movie-actor-popularity": {
      const { getCompQuizMovieQuestions } = await import("./data/Movie")
      const questions = await getCompQuizMovieQuestions("week", category)

      // @ts-ignore
      return Response.json(questions)
    }
    case "club-trophies":
    case "club-foundation-date":
    case "club-stadium-capacity":
    case "club-stadium-opened-date": {
      const { getClubFootballQuestions } = await import("./data/ClubFootball")
      const questions = await getClubFootballQuestions(category)

      return Response.json(questions)
    }
    default: {
      return new Response("Not found", { status: 404 })
    }
  }
}
