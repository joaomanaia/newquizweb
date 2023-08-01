import React from "react"
import HomeCardItem from "../../../model/HomeCardItem"
import HomeCardItemContent from "./HomeCardItemContent"
import MainContainer from "../m3/MainContainer"

type HomeItemsProps = {
  items: HomeCardItem[]
}

const HomeItems: React.FC<HomeItemsProps> = ({ items }) => {
  return (
    <MainContainer className="flex flex-col h-full items-center justify-center space-y-4">
      {items.map((item) => (
        <HomeCardItemContent key={item.id} item={item} />
      ))}
    </MainContainer>
  )
}

export default HomeItems
