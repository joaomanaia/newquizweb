"use client"

import { Container } from "@mui/material"
import React from "react"
import HomeCardItem from "../../../model/HomeCardItem"
import HomeCardItemContent from "./HomeCardItemContent"

type HomeItemsProps = {
  items: HomeCardItem[]
}

const HomeItems: React.FC<HomeItemsProps> = ({ items }) => {
  return (
    <Container className="flex flex-col h-full items-center justify-center space-y-4">
      {items.map((item) => (
        <HomeCardItemContent key={item.id} item={item} />
      ))}
    </Container>
  )
}

export default HomeItems
