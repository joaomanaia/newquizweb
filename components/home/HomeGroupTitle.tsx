import { Typography, Unstable_Grid2 as Grid2 } from "@mui/material"
import { HomeGroupTitleItem } from "../../model/HomeCardItem"

const HomeGroupTitle: React.FC<HomeGroupTitleItem> = ({ title }) => {
  return (
    <Typography className="py-4" variant="h4">
      {title}
    </Typography>
  )
}

export default HomeGroupTitle
