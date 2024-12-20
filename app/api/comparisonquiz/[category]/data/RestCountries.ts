import { RESTCOUNTRIES_API_URL } from "@/core/common/BaseUrls"
import { shuffleArray } from "@/core/util/Array"
import type { RestCountryCategory } from "@/types/ComparisonQuizTypes"

export const getCompQuizCountryQuestions = async (
  category: RestCountryCategory,
  size: number
): Promise<ComparisonQuizItem[]> => {
  const res = await fetch(`${RESTCOUNTRIES_API_URL}/all`)

  const countries: RestCountriesResponse[] = await res.json()
  const questions = countries.map((country) =>
    mapRestCountriesResponseToCompQuizItem(country, category)
  )

  // filter out items with the same value as the previous item
  const filteredItems = questions.filter((item, index, arr) => {
    if (index === 0) return true
    return item.value !== arr[index - 1].value
  })

  return shuffleArray(filteredItems).slice(0, size)
}

const mapRestCountriesResponseToCompQuizItem = (
  data: RestCountriesResponse,
  category: RestCountryCategory
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
  category: RestCountryCategory
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
