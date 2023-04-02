import { RESTCOUNTRIES_API_URL } from "@/core/common/BaseUrls"
import { shuffleArray } from "@/core/util/Array"

type Category = "country-population" | "country-area"

export const getCompQuizCountryAreaQuestions = async (category: Category) => {
  const res = await fetch(`${RESTCOUNTRIES_API_URL}/all`)

  const countries: RestCountriesResponse[] = await res.json()
  const questions = countries.map((country) => mapRestCountriesResponseToCompQuizItem(country, category))

  return shuffleArray(questions)
}

const mapRestCountriesResponseToCompQuizItem = (
  data: RestCountriesResponse,
  category: Category
): ComparisonQuizItem => {
  const value = getValueFromRestCountriesResponse(data, category)

  return {
    title: data.name.common,
    value: value,
    imgUrl: data.flags.svg,
  }
}

const getValueFromRestCountriesResponse = (
  data: RestCountriesResponse,
  category: Category
) => {
  switch (category) {
    case "country-population":
      return data.population
    case "country-area":
      return data.area
    default:
      throw new Error("Invalid category")
  }
}
