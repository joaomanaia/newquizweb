import { expect, test } from "@jest/globals"
import { decodeBase64String } from "@/core/util/StringUtil"

test("decode base64 string", () => {
  const base64EncodedString = "SGVsbG8gV29ybGQh"
  const expectedDecodedString = "Hello World!"
  expect(decodeBase64String(base64EncodedString)).toBe(expectedDecodedString)
})
