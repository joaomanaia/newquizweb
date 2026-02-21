import { env } from "@/env"

/**
 * Controls whether external API calls are bypassed with local fixture data.
 *
 * Enabled by default in development. Override with the MOCK_EXTERNAL_APIS env var:
 *   - Set to false in dev to hit real APIs
 *   - Set to true in prod/staging to force fixtures (useful for CI)
 */
export const shouldMockExternalApis = () =>
  env.MOCK_EXTERNAL_APIS || (env.NODE_ENV === "development" && env.MOCK_EXTERNAL_APIS !== false)
