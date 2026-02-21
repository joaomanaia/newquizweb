import MultiChoiceQuestion, {
  decodeBase64Question,
} from "../../../src/model/multichoicequiz/MultiChoiceQuestion"

test("decode base64 question", () => {
  const testQuestion = {
    id: "1",
    description: "ZGVzY3JpcHRpb24=",
    answers: ["YW5zd2VyXzE=", "YW5zd2VyXzI="],
    category: "Y2F0ZWdvcnk=",
    correctAns: 1,
    type: "dHlwZQ==",
    difficulty: "ZGlmZmljdWx0eQ==",
  }

  const decodedQuestion = decodeBase64Question(testQuestion)
  expect(decodedQuestion.description).toBe("description")
  expect(decodedQuestion.answers[0]).toBe("answer_1")
  expect(decodedQuestion.category).toBe("category")
  expect(decodedQuestion.type).toBe("type")
  expect(decodedQuestion.difficulty).toBe("difficulty")
})
