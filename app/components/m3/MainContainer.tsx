"use client"

import { useMediaQuery, useTheme, SxProps, Paper, Container } from "@mui/material"

interface MainContainerProps {
  className?: string
  children?: React.ReactNode
}

const MainContainer: React.FC<MainContainerProps> = ({ className, children }) => {
  const theme = useTheme()
  const isSmUp = useMediaQuery(theme.breakpoints.up("md"))
  const isSxUp = useMediaQuery(theme.breakpoints.up("sm"))
  const radiusTop = 30
  const radiusBottom = isSxUp ? 25 : 0

  const paperStyle: SxProps = {
    p: isSxUp ? 4 : 2,
    borderTopLeftRadius: radiusTop,
    borderTopRightRadius: radiusTop,
    borderBottomLeftRadius: radiusBottom,
    borderBottomRightRadius: radiusBottom,
    height: isSxUp ? "auto" : 1,
    mt: 0,
    mb: isSxUp ? 2 : 0,
    mr: isSxUp ? 2 : 0,
    ml: isSxUp ? (isSmUp ? 0 : 2) : 0,
  }

  return (
    <Paper sx={paperStyle} elevation={0} className={className}>
      {children}
    </Paper>
  )
}

export default MainContainer
