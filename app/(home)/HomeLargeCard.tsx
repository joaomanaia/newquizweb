import { Card, Typography } from "@mui/material"
import { HomeLargeCardItem } from "../../model/HomeCardItem"
import NextLink from "next/link"

const HomeLargeCard: React.FC<HomeLargeCardItem> = ({ title, Icon, variant, href }) => {  
  return (
    <NextLink
      href={href}
      passHref
      className="text-inherit bg-inherit decoration-transparent">
      <Card variant={variant}>
        <div className="p-2 cursor-pointer w-96">
          <Typography variant="h6">{title}</Typography>
          <div className="flex w-full mt-2 justify-end">
              <Icon className="h-24 w-24" />
          </div>
        </div>
      </Card>
    </NextLink>
  )
}

export default HomeLargeCard
