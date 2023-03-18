export async function GET({ params }: { params: { category: string } }) {
  const category = params.category

  switch (category) {
    case "country-population": {
      const { getCompQuizCountryPopQuestions } = await import("./data/CountryPopulation")
      const questions = await getCompQuizCountryPopQuestions()

      // @ts-ignore
      return Response.json(questions)
    }
    default: {
      return new Response("Not found", { status: 404 })
    }
  }
}
