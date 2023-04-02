export async function GET(request: Request, { params }: { params: { category: string } }) {
  const category = params.category

  switch (category) {
    case "country-population": {
      const { getCompQuizCountryAreaQuestions } = await import("./data/RestCountries")
      const questions = await getCompQuizCountryAreaQuestions("country-population")

      // @ts-ignore
      return Response.json(questions)
    }
    case "country-area": {
      const { getCompQuizCountryAreaQuestions } = await import("./data/RestCountries")
      const questions = await getCompQuizCountryAreaQuestions("country-area")

      // @ts-ignore
      return Response.json(questions)
    }
    case "movie-popularity": {
      const { getCompQuizMovieQuestions } = await import("./data/Movie")
      const questions = await getCompQuizMovieQuestions("day", "popularity")

      // @ts-ignore
      return Response.json(questions)
    }
    case "movie-release-date": {
      const { getCompQuizMovieQuestions } = await import("./data/Movie")
      const questions = await getCompQuizMovieQuestions("day", "release-date")

      // @ts-ignore
      return Response.json(questions)
    }
    default: {
      return new Response("Not found", { status: 404 })
    }
  }
}
