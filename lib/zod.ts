import * as z from "zod"

export function emptyStringToUndefined<T extends z.ZodType>(schema: T) {
  return z.preprocess((val) => (val === "" ? undefined : val), schema)
}
