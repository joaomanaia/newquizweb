import { logEvent } from "firebase/analytics"
import { analytics } from "../../firebase"

export const logGameStart = (
    questionsSize: number
) => {
    logEvent(analytics, "multi_choice_game_start",  {
        multi_choice_questions_size: questionsSize
    })
}