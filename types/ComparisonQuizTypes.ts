const moviesCategories = ["movie-popularity", "movie-release-date", "movie-actor-popularity"] as const
export type MovieCategory = typeof moviesCategories[number]

const restCountriesCategories = ["country-population", "country-area"] as const
export type RestCountryCategory = typeof restCountriesCategories[number]

const clubFootballCategories = ["club-trophies", "club-foundation-date", "club-stadium-capacity", "club-stadium-opened-date"] as const
export type ClubFootballCategory = typeof clubFootballCategories[number]

export const comparisonQuizCategories = [...moviesCategories, ...restCountriesCategories, ...clubFootballCategories] as const
export type ComparisonQuizCategory = typeof comparisonQuizCategories[number]
