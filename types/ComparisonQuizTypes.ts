export type MovieCategory =
  | "movie-popularity"
  | "movie-release-date"
  | "movie-actor-popularity"

export type RestCountryCategory = "country-population" | "country-area"

export type ClubFootballCategory = 
  | "club-trophies"
  | "club-foundation-date"
  | "club-stadium-capacity"
  | "club-stadium-opened-date"

export type ComparisonQuizCategory =
  | MovieCategory
  | RestCountryCategory
  | ClubFootballCategory
