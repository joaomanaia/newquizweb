"use client"

import { Card, Typography } from "@mui/material"

interface AnswerCardProps {
  text: string
  selected: boolean
  onClick: () => void
}

const AnswerCard: React.FC<AnswerCardProps> = ({ text, selected, onClick }) => {
  return (
    <Card
      variant={selected ? "primary" : "outlined"}
      sx={{ width: "auto", borderRadius: "9999px", cursor: "pointer" }}
      onClick={onClick}
    >
      <Typography padding={1}>{text}</Typography>
    </Card>
  )
}

export default AnswerCard
