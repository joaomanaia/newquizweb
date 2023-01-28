import { Box, CircularProgress, Typography } from "@mui/material"
import RemainingTime from "../../model/multichoicequiz/RemainingTime"

interface ProgressWithTextProps {
  remainingTime: RemainingTime
  minQuizTime: number
  maxQuizTime: number
}

const normaliseProgressValue = (
  value: number,
  minQuizTime: number,
  maxQuizTime: number
): number => {
  return ((value - minQuizTime) * 100) / (maxQuizTime - minQuizTime)
}

const ProgressWithText: React.FC<ProgressWithTextProps> = ({
  remainingTime,
  minQuizTime,
  maxQuizTime,
}) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        size={80}
        thickness={2}
        variant="determinate"
        value={normaliseProgressValue(remainingTime.value, minQuizTime, maxQuizTime)}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="subtitle1">{remainingTime.toMinuteSecond()}</Typography>
      </Box>
    </Box>
  )
}

export default ProgressWithText
