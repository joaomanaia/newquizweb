import { REST_COUNTRIES_FIXTURES } from "@/app/api/_dev/fixtures/rest-countries"
import { shouldMockExternalApis } from "@/app/api/_dev/mock-apis"
import { RESTCOUNTRIES_API_URL } from "@/core/common/BaseUrls"

export const fetchAllCountries = async (): Promise<RestCountriesResponse[]> => {
  if (shouldMockExternalApis()) {
    console.warn("Using fixture data for Rest Countries API")
    return REST_COUNTRIES_FIXTURES
  }

  const res = await fetch(`${RESTCOUNTRIES_API_URL}/all`)
  return res.json()
}
