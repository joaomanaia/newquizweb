import { hc } from "hono/client"
import type { AppType } from "@/app/api/[[...route]]/route"
import { env } from "@/src/env"

export const client = hc<AppType>(/* env.VERCEL_URL ??  */ env.NEXT_PUBLIC_APP_URL)
