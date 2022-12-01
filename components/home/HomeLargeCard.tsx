import { Card, Typography } from "@mui/material"
import { HomeLargeCardItem } from "../../model/HomeCardItem"

const HomeLargeCard: React.FC<HomeLargeCardItem> = ({ title, Icon, variant, onClick }) => {  
  return (
    <Card variant={variant} onClick={onClick}>
      <div className="p-2 cursor-pointer w-96">
        <Typography variant="h6">{title}</Typography>
        <div className="flex w-full mt-2 justify-end">
            <Icon className="h-24 w-24" />
        </div>
      </div>
    </Card>
  )
}

export default HomeLargeCard
