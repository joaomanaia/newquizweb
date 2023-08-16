export type TMDBResponse = {
  page: number
  results: MovieTMDBResult[] | PeopleTMDBResult[]
  total_pages: number
  total_results: number
}

type BaseTMDBResult <MediaType> = {
  id: number
  popularity: number
  media_type: MediaType
}

export type MovieTMDBResult = BaseTMDBResult<"movie"> & {
  backdrop_path: string
  title: string
  release_date: string
}

export type PeopleTMDBResult = BaseTMDBResult<"person"> & {
  name: string
  profile_path: string
}

