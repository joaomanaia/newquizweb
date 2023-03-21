import { RESTCOUNTRIES_API_URL } from "@/core/common/BaseUrls"

const mapRestCountriesResponseToCompQuizItem = (
  data: RestCountriesResponse
): ComparisonQuizItem => {
  return {
    title: data.name.common,
    value: Math.round(data.area),
    imgUrl: data.flags.svg,
  }
}

export const getCompQuizCountryAreaQuestions = async () => {
  const res = await fetch(`${RESTCOUNTRIES_API_URL}/all`)

  const countries: RestCountriesResponse[] = await res.json()

  return countries.map(mapRestCountriesResponseToCompQuizItem)
}
