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

export async function GET() {
  try {
    const questions = await getOpenTDBQuestions()

    const openTDBResponse = questions.results
    const results = openTDBResponse.map(convertOpenTDBResultToQuestion)

    // @ts-ignore
    return Response.json({ questions: results })
  } catch (e: unknown) {
    return new Response("An error occurred: " + e, { status: 500 })
  }
}
