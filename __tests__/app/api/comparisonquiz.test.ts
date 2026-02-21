import { describe, expect, test } from "bun:test"
import app from "@/app/api/comparisonquiz"

describe("comparisonquiz api", () => {
  test("GET /:category returns data for club category", async () => {
    const res = await app.request("/club-trophies?size=3")

    expect(res.status).toBe(200)
    const body = (await res.json()) as ComparisonQuizItem[]

    expect(Array.isArray(body)).toBe(true)
    expect(body).toHaveLength(3)
    expect(body[0]).toEqual(
      expect.objectContaining({
        title: expect.any(String),
        value: expect.any(Number),
        imgUrl: expect.any(String),
      })
    )
  })

  test("GET /:category rejects invalid category", async () => {
    const res = await app.request("/invalid-category")
    expect(res.status).toBe(400)
  })

  test("GET /:category rejects size below minimum", async () => {
    const res = await app.request("/club-trophies?size=1")
    expect(res.status).toBe(400)
  })

  test("GET /:category returns 500 when category provider throws", async () => {
    const res = await app.request("/movie-popularity?size=2")
    expect(res.status).toBe(500)
    expect(await res.json()).toEqual({
      message: "Failed to fetch data for the requested category",
    })
  })
})
