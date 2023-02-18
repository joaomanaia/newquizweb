import { NextApiRequest, NextApiResponse } from "next"

type Data = {
  questions: Question[]
  message: string | undefined
}

const BASE_URL = "http://numbersapi.com/random/"

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const min = reqQueryToNumber(req.query.min, 0)
  const max = reqQueryToNumber(req.query.max, 100000)
  const size = reqQueryToNumber(req.query.size, 1)

  if (req.method !== "GET") {
    res.status(400).end()
    return
  }

  if (size > 10) {
    res.status(400)
    res.json({ questions: [], message: "Max question size is 10, you requested: " + size })

    return res.end()
  }

  res.setHeader("Content-Type", "application/json")

  const promises: Promise<Question>[] = []

  for (let i = 0; i < size; i++) {
    promises.push(getRandomNumber(min, max))
  }

  const numbers = await Promise.all(promises)

  res.status(200).json({ questions: numbers, message: undefined })
  res.end()
}

const reqQueryToString = (data: string | string[] | undefined) => {
  const dataString = Array.isArray(data) ? data[0] : data
  return dataString ?? null
}

const reqQueryToNumber = (data: string | string[] | undefined, defaultNumber: number) => {
  const dataString = reqQueryToString(data)

  return parseInt(dataString ?? defaultNumber.toString())
}

type Question = {
  number: number
  question: string
}

const getRandomNumber = (min: number | null, max: number | null): Promise<Question> => {
  const url =
    min && max ? `${BASE_URL}?min=${min || ""}&max=${max || ""}&json=true` : `${BASE_URL}?json=true`

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const dataText: string = data.text

      // Remove the data number from the beginning of the string
      const question = dataText.substring(dataText.indexOf(" ") + 1)

      return { number: data.number, question: question }
    })
}
