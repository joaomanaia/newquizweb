import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test"
import { testClient } from "hono/testing"
import app from "@/app/api/[[...route]]/numberTrivia"

describe("numberTrivia api", () => {
  const client = testClient(app)
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    globalThis.fetch = originalFetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  test("GET /random returns requested number of questions", async () => {
    let call = 0
    const fetchMock = mock(async () => {
      call += 1

      const payload =
        call === 1
          ? { number: 10, text: "10 is the first two-digit number." }
          : { number: 42, text: "42 is the answer to life, the universe, and everything." }

      return new Response(JSON.stringify(payload), { status: 200 })
    })

    globalThis.fetch = fetchMock as unknown as typeof fetch

    const res = await client.random.$get({ query: { min: "1", max: "100", size: "2" } })

    expect(res.status).toBe(200)
    expect(fetchMock).toHaveBeenCalledTimes(2)

    const body = (await res.json()) as { questions: Array<{ number: number; question: string }> }
    expect(body.questions).toEqual([
      { number: 10, question: "is the first two-digit number." },
      { number: 42, question: "is the answer to life, the universe, and everything." },
    ])
  })

  test("GET /random rejects when min is greater than max", async () => {
    const res = await app.request("/random?min=20&max=10")
    expect(res.status).toBe(400)
  })

  test("GET /random rejects invalid size", async () => {
    const res = await app.request("/random?size=11")
    expect(res.status).toBe(400)
  })

  test("GET /random returns 500 when upstream throws", async () => {
    globalThis.fetch = mock(async () => {
      throw new Error("upstream failed")
    }) as unknown as typeof fetch

    const res = await app.request("/random?size=1")
    expect(res.status).toBe(500)
    expect(await res.json()).toEqual({ message: "Failed to fetch questions" })
  })
})
