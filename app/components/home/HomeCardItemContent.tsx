import HomeCardItem, {
  HomeCustomItem,
  HomeGroupTitleItem,
  HomeHorizontalItemsItem,
  HomeLargeCardItem,
} from "../../../model/HomeCardItem"
import HomeGroupTitle from "./HomeGroupTitle"
import HomeLargeCard from "./HomeLargeCard"

interface HomeCardItemContentProps {
  item: HomeCardItem
}

const HomeCardItemContent: React.FC<HomeCardItemContentProps> = ({ item }) => {
  if (item instanceof HomeGroupTitleItem) {
    return <HomeGroupTitle {...item} />
  } else if (item instanceof HomeCustomItem) {
    return <>{item.content()}</>
  } else if (item instanceof HomeLargeCardItem) {
    return <HomeLargeCard {...item} />
  } else if (item instanceof HomeHorizontalItemsItem) {
    return (
      <div className={item.className}>
        {item.items.map((itemValue) => item.itemContent(itemValue))}
      </div>
    )
  } else {
    return <></>
  }
}

export default HomeCardItemContent
