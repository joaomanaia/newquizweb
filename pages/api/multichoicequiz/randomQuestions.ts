import type { NextApiRequest, NextApiResponse } from "next"
import OpenTDBQuestionResponse, {
  convertOpenTDBResultToQuestion,
} from "../../../model/multichoicequiz/OpenTDBQuestionResponse"
import MultiChoiceQuestion from "../../../model/multichoicequiz/MultiChoiceQuestion"

const API_URL = "https://opentdb.com/api.php"

const getOpenTDBQuestions = async (amount: number = 5): Promise<OpenTDBQuestionResponse> => {
  const requestUrl = `${API_URL}?encode=base64&amount=${amount}`

  const textRes = await fetch(requestUrl).then((res) => res.text())
  return JSON.parse(textRes)
}

const getOpenTDBQuestionsTest = async (amount: number = 5): Promise<OpenTDBQuestionResponse> => {
  return {
    responde_code: 2,
    results: [
      {
        category: 'SGlzdG9yeQ==',
        type: 'Ym9vbGVhbg==',
        difficulty: 'bWVkaXVt',
        question: 'VGhlIGZpcnN0IHRlbGV2aXNlZCBwcmVzaWRlbnRpYWwgZGViYXRlIHdhcyBiZXR3ZWVuIEppbW15IENhcnRlciBhbmQgR2VyYWxkIEZvcmQu',
        correct_answer: 'RmFsc2U=',
        incorrect_answers: [ 'VHJ1ZQ==' ]
      },
      {
        category: 'RW50ZXJ0YWlubWVudDogVmlkZW8gR2FtZXM=',
        type: 'bXVsdGlwbGU=',
        difficulty: 'bWVkaXVt',
        question: 'V2hhdCBpcyB0aGUgbmFtZSBvZiB0aGUgZmluYWwgYm9zcyBpbiBUdXJvazogRGlub3NhdXIgSHVudGVyPw==',
        correct_answer: 'VGhlIENhbXBhaWduZXI=',
        incorrect_answers: [ 'VGhlIFByaW1hZ2Vu', 'T2JsaXZpb24=', 'TG9yZCBUeXJhbm51cw==' ]
      },
      {
        category: 'RW50ZXJ0YWlubWVudDogTXVzaWM=',
        type: 'Ym9vbGVhbg==',
        difficulty: 'aGFyZA==',
        question: 'UGV0ZSBUb3duc2hlbmQncyBzb2xvIGFsYnVtLCAiV2hpdGUgQ2l0eTogQSBOb3ZlbCIsIGlzIHNldCBpbiB0aGUgbWV0cm9wb2xpdGFuIGFyZWEgb2YgQ2hpY2Fnby4=',
        correct_answer: 'RmFsc2U=',
        incorrect_answers: [ 'VHJ1ZQ==' ]
      },
      {
        category: 'RW50ZXJ0YWlubWVudDogQm9hcmQgR2FtZXM=',
        type: 'bXVsdGlwbGU=',
        difficulty: 'aGFyZA==',
        question: 'SW4gTWFnaWM6IFRoZSBHYXRoZXJpbmcsIHdoYXQgdGVybSBmb3IgYmxvY2tpbmcgd2FzIGVzdGFibGlzaGVkIGluIHRoZSBQb3J0YWwgc2V0Pw==',
        correct_answer: 'SW50ZXJjZXB0aW5n',
        incorrect_answers: [ 'QmxvY2tpbmc=', 'UmVzaXN0aW5n', 'U2hpZWxkaW5n' ]
      },
      {
        category: 'R2VvZ3JhcGh5',
        type: 'bXVsdGlwbGU=',
        difficulty: 'bWVkaXVt',
        question: 'V2hhdCBjaXR5IGlzIHRoZSBUZXJyYWNvdHRhIEFybXkgbG9jYXRlZCBpbj8=',
        correct_answer: 'WGknYW4=',
        incorrect_answers: [ 'QmVpamluZw==', 'U2hhbmdoYWk=', 'SG9uZyBLb25n' ]
      }
    ]
  }
}

type Data = {
  questions: MultiChoiceQuestion[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  getOpenTDBQuestionsTest()
    .then((openTDBResponse) => openTDBResponse.results)
    .then((results) => results.map(convertOpenTDBResultToQuestion))
    .then((questions) => res.status(200).json({ questions: questions }))
    .catch((e) => res.status(404).send(e))
}
