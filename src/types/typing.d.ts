type ComparisonQuizItem = {
  title: string
  value: number
  imgUrl: string
}

type RestCountriesResponse = {
  name: {
    common: string
  }
  population: number
  area: number
  flags: {
    svg: string
  }
}
