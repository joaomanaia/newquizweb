import { isLocalHost } from "../../../../core/util/Network"
import OpenTDBQuestionResponse, {
  convertOpenTDBResultToQuestion,
} from "../../../../model/multichoicequiz/OpenTDBQuestionResponse"

const API_URL = "https://opentdb.com/api.php"

export const revalidate = 0

const getOpenTDBQuestions = async (amount: number = 5): Promise<OpenTDBQuestionResponse> => {
  const requestUrl = `${API_URL}?encode=base64&amount=${amount}`

  const res = await fetch(requestUrl, {
    cache: "no-store"
  })
  const textRes = await res.text()
  return JSON.parse(textRes)
}

const getOpenTDBQuestionsTest = async (amount: number = 5): Promise<OpenTDBQuestionResponse> => {
  return {
    responde_code: 2,
    results: [
      {
        category: "SGlzdG9yeQ==",
        type: "Ym9vbGVhbg==",
        difficulty: "bWVkaXVt",
        question:
          "VGhlIGZpcnN0IHRlbGV2aXNlZCBwcmVzaWRlbnRpYWwgZGViYXRlIHdhcyBiZXR3ZWVuIEppbW15IENhcnRlciBhbmQgR2VyYWxkIEZvcmQu",
        correct_answer: "RmFsc2U=",
        incorrect_answers: ["VHJ1ZQ=="],
      },
      {
        category: "RW50ZXJ0YWlubWVudDogVmlkZW8gR2FtZXM=",
        type: "bXVsdGlwbGU=",
        difficulty: "bWVkaXVt",
        question:
          "V2hhdCBpcyB0aGUgbmFtZSBvZiB0aGUgZmluYWwgYm9zcyBpbiBUdXJvazogRGlub3NhdXIgSHVudGVyPw==",
        correct_answer: "VGhlIENhbXBhaWduZXI=",
        incorrect_answers: ["VGhlIFByaW1hZ2Vu", "T2JsaXZpb24=", "TG9yZCBUeXJhbm51cw=="],
      },
      {
        category: "RW50ZXJ0YWlubWVudDogTXVzaWM=",
        type: "Ym9vbGVhbg==",
        difficulty: "aGFyZA==",
        question:
          "UGV0ZSBUb3duc2hlbmQncyBzb2xvIGFsYnVtLCAiV2hpdGUgQ2l0eTogQSBOb3ZlbCIsIGlzIHNldCBpbiB0aGUgbWV0cm9wb2xpdGFuIGFyZWEgb2YgQ2hpY2Fnby4=",
        correct_answer: "RmFsc2U=",
        incorrect_answers: ["VHJ1ZQ=="],
      },
      {
        category: "RW50ZXJ0YWlubWVudDogQm9hcmQgR2FtZXM=",
        type: "bXVsdGlwbGU=",
        difficulty: "aGFyZA==",
        question:
          "SW4gTWFnaWM6IFRoZSBHYXRoZXJpbmcsIHdoYXQgdGVybSBmb3IgYmxvY2tpbmcgd2FzIGVzdGFibGlzaGVkIGluIHRoZSBQb3J0YWwgc2V0Pw==",
        correct_answer: "SW50ZXJjZXB0aW5n",
        incorrect_answers: ["QmxvY2tpbmc=", "UmVzaXN0aW5n", "U2hpZWxkaW5n"],
      },
      {
        category: "R2VvZ3JhcGh5",
        type: "bXVsdGlwbGU=",
        difficulty: "bWVkaXVt",
        question: "V2hhdCBjaXR5IGlzIHRoZSBUZXJyYWNvdHRhIEFybXkgbG9jYXRlZCBpbj8=",
        correct_answer: "WGknYW4=",
        incorrect_answers: ["QmVpamluZw==", "U2hhbmdoYWk=", "SG9uZyBLb25n"],
      },
    ],
  }
}

export async function GET() {
  try {
    const questions = isLocalHost() ? await getOpenTDBQuestionsTest() : await getOpenTDBQuestions()

    const openTDBResponse = questions.results
    const results = openTDBResponse.map(convertOpenTDBResultToQuestion)

    // @ts-ignore
    return Response.json({ questions: results })
  } catch (e: unknown) {
    return new Response("An error occurred: " + e, { status: 500 })
  }
}
