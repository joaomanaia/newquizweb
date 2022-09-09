import { ListItem, ListItemButton, ListItemText, useTheme } from "@mui/material"

interface AnswerCardProps {
  text: string
  selected: boolean
  onClick: () => void
}

const AnswerCard: React.FC<AnswerCardProps> = ({ text, selected, onClick }) => {
  const { palette } = useTheme()

  return (
    <ListItem disablePadding>
      <ListItemButton color={palette.error.main} selected={selected} onClick={onClick}>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )
}

export default AnswerCard
