import { zValidator as zv } from "@hono/zod-validator"
import type { ValidationTargets } from "hono"
import * as z from "zod"

type ValidationErrorResponse = {
  message: string
  errors: Record<string, string>
}

export function emptyStringToUndefined<T extends z.ZodType>(schema: T) {
  return z.preprocess((val) => (val === "" ? undefined : val), schema)
}

export function prettifyZodError(error: z.core.$ZodError): ValidationErrorResponse {
  const { formErrors, fieldErrors } = z.flattenError(error) as {
    formErrors: string[]
    fieldErrors: Record<string, string[] | undefined>
  }
  const errors: Record<string, string> = {}

  for (const field in fieldErrors) {
    const message = fieldErrors[field]?.[0]
    if (message) {
      errors[field] = message
    }
  }

  const formError = formErrors[0]
  if (formError) {
    errors.form = formError
  }

  return {
    message: "Validation failed",
    errors,
  }
}

export function zValidator<T extends z.ZodType, Target extends keyof ValidationTargets>(
  target: Target,
  schema: T
) {
  return zv(target, schema, (result, c) => {
    if (!result.success) {
      return c.json(prettifyZodError(result.error), 400)
    }
  })
}
