import HomeCardItem, { HomeCustomItem, HomeGroupTitleItem, HomeLargeCardItem } from "../../model/HomeCardItem"
import HomeGroupTitle from "./HomeGroupTitle"
import HomeLargeCard from "./HomeLargeCard"

interface HomeCardItemContentProps {
    item: HomeCardItem
}

const HomeCardItemContent: React.FC<HomeCardItemContentProps> = ({ item }) => {
    if (item instanceof HomeGroupTitleItem) {
        return <HomeGroupTitle {...item} />
    } else if (item instanceof HomeCustomItem) {
        return <div>{item.content()}</div>
    } else if (item instanceof HomeLargeCardItem) {
        return <HomeLargeCard {...item} />
    } else {
        return <></>
    }
}

export default HomeCardItemContent