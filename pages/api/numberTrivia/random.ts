import { NextApiRequest, NextApiResponse } from "next"

type Data = {
  number: number
  question: string
}

const BASE_URL = "http://numbersapi.com/random/"

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const min = req.query.min
  const max = req.query.max

  const url = (min && max) ? `${BASE_URL}?min=${min || ""}&max=${max || ""}&json=true` : `${BASE_URL}?json=true`

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const dataText: string = data.text

      // Remove the data number from the beginning of the string
      const question = dataText.substring(dataText.indexOf(" ") + 1)

      res.status(200).json({ number: data.number, question: question })
    }).catch((e) => res.status(404).end())
}
