import { createEnv } from "@t3-oss/env-nextjs"
import { vercel } from "@t3-oss/env-nextjs/presets-zod"
import * as z from "zod"

export const env = createEnv({
  extends: [vercel()],
  server: {
    MOCK_EXTERNAL_APIS: z
      .string()
      .transform((s) => s !== "false" && s !== "0")
      .optional(),
  },
  shared: {
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.url(),
  },
  runtimeEnv: {
    MOCK_EXTERNAL_APIS: process.env.MOCK_EXTERNAL_APIS,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
})
