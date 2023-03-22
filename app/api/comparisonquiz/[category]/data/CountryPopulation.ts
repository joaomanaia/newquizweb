import { RESTCOUNTRIES_API_URL } from "@/core/common/BaseUrls"
import { shuffleArray } from "@/core/util/Array"

const mapRestCountriesResponseToCompQuizItem = (
  data: RestCountriesResponse
): ComparisonQuizItem => {
  return {
    title: data.name.common,
    value: data.population,
    imgUrl: data.flags.svg,
  }
}

export const getCompQuizCountryPopQuestions = async () => {
  const res = await fetch(`${RESTCOUNTRIES_API_URL}/all`)

  const countries: RestCountriesResponse[] = await res.json()

  const questions = countries.map(mapRestCountriesResponseToCompQuizItem)
  return shuffleArray(questions)
}
