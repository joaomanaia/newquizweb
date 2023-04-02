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

type OpenTDBResponse = {
  page: number
  results: OpenTDBResult[]
  total_pages: number
  total_results: number
}

type OpenTDBResult = {
  backdrop_path: string
  id: number
  popularity: number
  title: string
  release_date: string
}
