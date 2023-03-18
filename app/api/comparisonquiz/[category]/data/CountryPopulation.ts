type RestCountriesResponse = {
  name: {
    common: string
  }
  population: number
  flags: {
    svg: string
  }
}

const RESTCOUNTRIES_API_URL = "https://restcountries.com/v3.1"

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

  return countries.map(mapRestCountriesResponseToCompQuizItem)
}
