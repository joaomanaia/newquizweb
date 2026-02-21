import { Analytics, logEvent } from "firebase/analytics"

export const logGameStart = (
    analytics: Analytics,
    questionsSize: number
) => {
    logEvent(analytics, "multi_choice_game_start",  {
        multi_choice_questions_size: questionsSize
    })
}