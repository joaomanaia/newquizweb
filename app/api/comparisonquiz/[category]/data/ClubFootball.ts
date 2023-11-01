import { shuffleArray } from "@/core/util/Array"
import { ClubFootballCategory } from "@/types/ComparisonQuizTypes"
import { promises as fs } from "fs"

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

export const getClubFootballQuestions = async (
  category: ClubFootballCategory
): Promise<ComparisonQuizItem[]> => {
  // Get the data from the json file
  const file = await fs.readFile(process.cwd() + "/data/comparison-quiz/club-football.json", "utf-8")
  const clubData: ClubFootballData[] = JSON.parse(file)

  const questions = clubData.map((club) => {
    const value = getValueFromClubFootball(club, category)

    return {
      title: club.club,
      value: value,
      imgUrl: "https://via.placeholder.com/150",
    }
  })

  return shuffleArray(questions)
}

const getValueFromClubFootball = (
  data: ClubFootballData,
  category: ClubFootballCategory
): number => {
  switch (category) {
    case "club-football-trophies":
      return data.trophies
    default:
      throw new Error("Invalid category")
  }
}
