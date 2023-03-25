export async function GET(request: Request, { params }: { params: { category: string } }) {
  const category = params.category

  switch (category) {
    case "country-population": {
      const { getCompQuizCountryPopQuestions } = await import("./data/CountryPopulation")
      const questions = await getCompQuizCountryPopQuestions()

      // @ts-ignore
      return Response.json(questions)
    }
    case "country-area": {
      const { getCompQuizCountryAreaQuestions } = await import("./data/CountryArea")
      const questions = await getCompQuizCountryAreaQuestions()

      // @ts-ignore
      return Response.json(questions)
    }
    case "movie-popularity": {
      const { getCompQuizMoviePopularityQuestions } = await import("./data/MoviePopularity")
      const questions = await getCompQuizMoviePopularityQuestions()

      // @ts-ignore
      return Response.json(questions)
    }
    default: {
      return new Response("Not found", { status: 404 })
    }
  }
}
