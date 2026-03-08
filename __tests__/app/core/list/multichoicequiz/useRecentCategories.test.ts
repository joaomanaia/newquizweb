import { beforeAll, beforeEach, describe, expect, test } from "bun:test"
import { MULTICHOICE_CATEGORIES } from "@/data/multichoice-categories"

function createLocalStorageMock(): Storage {
  const storage = new Map<string, string>()

  return {
    get length() {
      return storage.size
    },
    clear() {
      storage.clear()
    },
    getItem(key) {
      return storage.has(key) ? (storage.get(key) ?? null) : null
    },
    key(index) {
      return Array.from(storage.keys())[index] ?? null
    },
    removeItem(key) {
      storage.delete(key)
    },
    setItem(key, value) {
      storage.set(key, value)
    },
  }
}

let useCategoryList: (typeof import("@/app/(core)/list/multichoicequiz/_lib/useRecentCategories"))["useCategoryList"]
let initialState: ReturnType<typeof useCategoryList.getInitialState>

beforeAll(async () => {
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: createLocalStorageMock(),
  })
  ;({ useCategoryList } =
    await import("@/app/(core)/list/multichoicequiz/_lib/useRecentCategories"))
  initialState = useCategoryList.getInitialState()
})

beforeEach(() => {
  localStorage.clear()

  useCategoryList.setState(initialState, true)
})

describe("useCategoryList", () => {
  test("starts with the first three categories at the top", () => {
    const state = useCategoryList.getState()

    expect(state.top3Categories).toEqual(MULTICHOICE_CATEGORIES.slice(0, 3))
    expect(state.otherCategories).toEqual(MULTICHOICE_CATEGORIES.slice(3))
  })

  test("moves a category from otherCategories to the front of top3Categories", () => {
    const selectedCategory = MULTICHOICE_CATEGORIES[7]

    useCategoryList.getState().onCategorySelect(selectedCategory)
    const state = useCategoryList.getState()

    expect(state.top3Categories[0]).toBe(selectedCategory)
    expect(state.top3Categories).toHaveLength(3)
    expect(new Set(state.top3Categories).size).toBe(3)
    expect(state.otherCategories).not.toContain(selectedCategory)
    expect(state.otherCategories).toContain(MULTICHOICE_CATEGORIES[2])
  })

  test("reorders an already selected top category without changing membership", () => {
    const selectedCategory = MULTICHOICE_CATEGORIES[1]

    useCategoryList.getState().onCategorySelect(selectedCategory)
    const state = useCategoryList.getState()

    expect(state.top3Categories).toEqual([
      MULTICHOICE_CATEGORIES[1],
      MULTICHOICE_CATEGORIES[0],
      MULTICHOICE_CATEGORIES[2],
    ])
    expect(state.otherCategories).toEqual(MULTICHOICE_CATEGORIES.slice(3))
  })

  test("is idempotent when selecting the same category repeatedly", () => {
    const selectedCategory = MULTICHOICE_CATEGORIES[10]

    useCategoryList.getState().onCategorySelect(selectedCategory)
    const afterFirstSelection = useCategoryList.getState().top3Categories

    useCategoryList.getState().onCategorySelect(selectedCategory)
    const afterSecondSelection = useCategoryList.getState().top3Categories

    expect(afterSecondSelection).toEqual(afterFirstSelection)
  })

  test("removes overlap between top3Categories and otherCategories after selection", () => {
    const repeatedCategory = MULTICHOICE_CATEGORIES[1]
    const selectedCategory = MULTICHOICE_CATEGORIES[8]

    useCategoryList.setState(
      {
        top3Categories: [MULTICHOICE_CATEGORIES[0], repeatedCategory, MULTICHOICE_CATEGORIES[2]],
        otherCategories: [repeatedCategory, MULTICHOICE_CATEGORIES[3], MULTICHOICE_CATEGORIES[4]],
      },
      false
    )

    useCategoryList.getState().onCategorySelect(selectedCategory)
    const state = useCategoryList.getState()

    expect(state.top3Categories).toHaveLength(3)
    expect(state.top3Categories).toEqual([
      selectedCategory,
      MULTICHOICE_CATEGORIES[0],
      repeatedCategory,
    ])
    expect(state.otherCategories).not.toContain(selectedCategory)
    expect(state.otherCategories).not.toContain(repeatedCategory)

    const overlap = state.top3Categories.filter((category) =>
      state.otherCategories.includes(category)
    )
    expect(overlap).toEqual([])
  })

  test("persists updated state to localStorage", () => {
    const selectedCategory = MULTICHOICE_CATEGORIES[12]

    useCategoryList.getState().onCategorySelect(selectedCategory)

    const rawPersistedState = localStorage.getItem("category-list")
    expect(rawPersistedState).not.toBeNull()

    const persistedState = JSON.parse(rawPersistedState ?? "{}") as {
      state: { top3Categories: Array<{ id: string }> }
    }

    expect(persistedState.state.top3Categories[0].id).toBe(selectedCategory.id)
  })

  test("rehydrates from localStorage when persisted data exists", async () => {
    const persistedState = {
      state: {
        top3Categories: [
          MULTICHOICE_CATEGORIES[20],
          MULTICHOICE_CATEGORIES[4],
          MULTICHOICE_CATEGORIES[0],
        ],
        otherCategories: MULTICHOICE_CATEGORIES.filter(
          (category) =>
            ![
              MULTICHOICE_CATEGORIES[20],
              MULTICHOICE_CATEGORIES[4],
              MULTICHOICE_CATEGORIES[0],
              // @ts-expect-error - Just want to ensure no duplicates in otherCategories
            ].includes(category)
        ),
      },
      version: 0,
    }

    localStorage.setItem("category-list", JSON.stringify(persistedState))

    await useCategoryList.persist.rehydrate()

    const state = useCategoryList.getState()
    expect(state.top3Categories).toEqual(persistedState.state.top3Categories)
    expect(state.otherCategories).toEqual(persistedState.state.otherCategories)
  })
})
