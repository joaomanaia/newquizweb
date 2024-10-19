import { shuffleArray } from "@/core/util/Array"
import type { ClubFootballCategory } from "@/types/ComparisonQuizTypes"
import clubData from "@/app/data/club-football.json"

type ClubFootballData = {
  club: string
  icon: string
  trophies: number
  founded: number
  stadium: ClubStadiumData
}

type ClubStadiumData = {
  name: string
  image: string
  capacity: number
  opened: number
}

/**
 * Get the questions for the club football categories
 *
 * @param category The club football category
 * @param canHaveConsecutiveSameValues If the questions can have consecutive same values
 * @returns Questions for the club football categories
 */
export const getClubFootballQuestions = async (
  category: ClubFootballCategory,
  canHaveConsecutiveSameValues: boolean = false
): Promise<ComparisonQuizItem[]> => {
  // Get the data from the json file
  const questions = clubData.map((club) => {
    return getQuestionFromClubFootball(club, category)
  })

  // Shuffle the questions
  const shuffledQuestions = shuffleArray(questions)

  // If the questions can have consecutive same values, return the questions
  if (canHaveConsecutiveSameValues) {
    return shuffledQuestions
  }

  // If the questions can't have consecutive same values, filter the questions
  const filteredQuestions = shuffledQuestions.filter((question, index, array) => {
    // If the current question is the first question, return true
    if (index === 0) {
      return true
    }

    // If the current question is not the first question, check if the current question value is the same as the previous question value
    const previousQuestion = array[index - 1]
    const currentQuestion = question

    return previousQuestion.value !== currentQuestion.value
  })

  // Limit the questions to 30
  return filteredQuestions.slice(0, 30)
}

const getQuestionFromClubFootball = (
  club: ClubFootballData,
  category: ClubFootballCategory
): ComparisonQuizItem => {
  switch (category) {
    case "club-trophies":
      return {
        title: club.club,
        value: club.trophies,
        imgUrl: club.icon,
      }
    case "club-foundation-date":
      return {
        title: club.club,
        value: club.founded,
        imgUrl: club.icon,
      }
    case "club-stadium-capacity":
      return {
        title: club.stadium.name,
        value: club.stadium.capacity,
        imgUrl: club.stadium.image,
      }
    case "club-stadium-opened-date":
      return {
        title: club.stadium.name,
        value: club.stadium.opened,
        imgUrl: club.stadium.image,
      }
  }
}
