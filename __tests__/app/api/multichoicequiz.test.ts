import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test"
import { testClient } from "hono/testing"
import app from "@/app/api/[[...route]]/multichoicequiz"

describe("multichoicequiz api", () => {
  const client = testClient(app)
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    globalThis.fetch = originalFetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  test("GET /randomQuestions returns mapped questions", async () => {
    const fetchMock = mock(async (input: RequestInfo | URL) => {
      const url = input.toString()
      expect(url).toContain("https://opentdb.com/api.php")
      expect(url).toContain("amount=3")
      expect(url).toContain("difficulty=easy")
      expect(url).toContain("encode=base64")

      return new Response(
        JSON.stringify({
          results: [
            {
              category: "General Knowledge",
              type: "multiple",
              difficulty: "easy",
              question: "What is 2 + 2?",
              correct_answer: "4",
              incorrect_answers: ["1", "2", "3"],
            },
          ],
        }),
        { status: 200 }
      )
    })

    globalThis.fetch = fetchMock as unknown as typeof fetch

    const res = await client.randomQuestions.$get({
      query: { size: "3", difficulty: "easy" },
    })

    expect(res.status).toBe(200)
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const body = (await res.json()) as { questions: Array<Record<string, unknown>> }
    expect(body.questions).toHaveLength(1)
    expect(body.questions[0].description).toBe("What is 2 + 2?")
    expect(body.questions[0].answers).toEqual(expect.arrayContaining(["1", "2", "3", "4"]))

    const answers = body.questions[0].answers as string[]
    const correctAnswerIndex = body.questions[0].correctAns as number
    expect(answers[correctAnswerIndex]).toBe("4")
  })

  test("GET /randomQuestions rejects invalid size", async () => {
    const res = await app.request("/randomQuestions?size=0")
    expect(res.status).toBe(400)
  })

  test("GET /randomQuestions rejects invalid difficulty", async () => {
    const res = await app.request("/randomQuestions?difficulty=orange")
    expect(res.status).toBe(400)
  })

  test("GET /randomQuestions returns 500 when upstream fails", async () => {
    globalThis.fetch = mock(
      async () => new Response(null, { status: 500 })
    ) as unknown as typeof fetch

    const res = await app.request("/randomQuestions?size=2")
    expect(res.status).toBe(500)
    expect(await res.json()).toEqual({ message: "Failed to fetch questions" })
  })
})
