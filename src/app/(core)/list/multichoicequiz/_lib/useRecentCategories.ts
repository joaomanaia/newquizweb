import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { MULTICHOICE_CATEGORIES } from "@/data/multichoice-categories"
import type { MultiChoiceCategory } from "@/model/multichoicequiz/MultiChoiceQuestion"

type UseCategoryListStore = {
  top3Categories: MultiChoiceCategory[]
  otherCategories: MultiChoiceCategory[]
  /** If an category is selected, it is moved to top3Categories and removed from otherCategories */
  onCategorySelect: (category: MultiChoiceCategory) => void
}

export const useCategoryList = create<UseCategoryListStore>()(
  persist(
    (set) => ({
      top3Categories: MULTICHOICE_CATEGORIES.slice(0, 3),
      otherCategories: MULTICHOICE_CATEGORIES.slice(3),
      onCategorySelect: (category) => {
        set((state) => {
          const filteredTop3 = state.top3Categories.filter((c) => c !== category)
          const newTop3Categories = [category, ...filteredTop3].slice(0, 3)
          const newOtherCategories = MULTICHOICE_CATEGORIES.filter(
            (c) => !newTop3Categories.includes(c)
          )

          return {
            top3Categories: newTop3Categories,
            otherCategories: newOtherCategories,
          }
        })
      },
    }),
    {
      name: "category-list",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
