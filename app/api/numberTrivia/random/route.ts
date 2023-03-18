const BASE_URL = "http://numbersapi.com/random/"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const min = reqQueryToNumber(searchParams.get("min"), 0)
  const max = reqQueryToNumber(searchParams.get("max"), 100000)
  const size = reqQueryToNumber(searchParams.get("size"), 1)

  if (size > 10) {
    return new Response("Max question size is 10, you requested: " + size, {
      status: 400,
    })
  }

  const promises: Promise<Question>[] = []

  for (let i = 0; i < size; i++) {
    promises.push(getRandomNumber(min, max))
  }

  const numbers = await Promise.all(promises)
  
  // @ts-ignore
  return Response.json({ questions: numbers, message: undefined })
}

const reqQueryToString = (data: string | string[] | null) => {
  const dataString = Array.isArray(data) ? data[0] : data
  return dataString ?? null
}

const reqQueryToNumber = (data: string | string[] | null, defaultNumber: number) => {
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

  return fetch(url, { cache: 'no-store' })
    .then((response) => response.json())
    .then((data) => {
      const dataText: string = data.text

      // Remove the data number from the beginning of the string
      const question = dataText.substring(dataText.indexOf(" ") + 1)

      return { number: data.number, question: question }
    })
}
