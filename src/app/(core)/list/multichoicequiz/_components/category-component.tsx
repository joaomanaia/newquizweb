"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { parseAsStringLiteral, useQueryState } from "nuqs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useCategoryList } from "@/app/(core)/list/multichoicequiz/_lib/useRecentCategories"
import { getQuizRoute } from "@/app/(core)/list/multichoicequiz/_lib/utils"
import { cn } from "@/lib/utils"
import type { MultiChoiceCategory } from "@/model/multichoicequiz/MultiChoiceQuestion"
import { difficulties } from "@/types/question-difficulty"

export function CategoryListComponent() {
  const router = useRouter()

  const [showAllCategories, setShowAllCategories] = useState(false)

  const { top3Categories, otherCategories, onCategorySelect } = useCategoryList()

  const useHydration = () => {
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
      const unsubFinishHydration = useCategoryList.persist.onFinishHydration(() =>
        setHydrated(true)
      )

      setHydrated(useCategoryList.persist.hasHydrated())

      return () => unsubFinishHydration()
    }, [])

    return hydrated
  }

  const hydrated = useHydration()

  const [selectedDifficulty] = useQueryState("difficulty", parseAsStringLiteral(difficulties))

  const onClick = (category: MultiChoiceCategory) => {
    const quizRoute = getQuizRoute({ categoryId: category.id, difficulty: selectedDifficulty })
    router.push(quizRoute)
    onCategorySelect(category)
  }

  if (!hydrated) {
    return <CategoryListSkeleton />
  }

  return (
    <ul className="flex w-full max-w-96 flex-col gap-4">
      {top3Categories.map((category) => (
        <CategoryItem key={category.id} name={category.name} onClick={() => onClick(category)} />
      ))}
      <Button
        onClick={() => setShowAllCategories((prev) => !prev)}
        variant="ghost"
        className="text-primary"
      >
        <ChevronDown
          className={cn("transition-transform", showAllCategories ? "rotate-180" : "rotate-0")}
        />
        {showAllCategories ? "Show Less" : "Show More"}
      </Button>
      {showAllCategories &&
        otherCategories.map((category) => (
          <CategoryItem key={category.id} name={category.name} onClick={() => onClick(category)} />
        ))}
    </ul>
  )
}

export function CategoryItem({ name, onClick }: { name: string; onClick: () => void }) {
  return (
    <li
      onClick={onClick}
      className="bg-surface-variant/20 flex h-25 cursor-pointer items-center justify-center rounded-2xl px-4 py-6 text-center text-lg"
    >
      {name}
    </li>
  )
}

export function CategoryListSkeleton() {
  return (
    <ul className="flex w-full max-w-96 flex-col gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <li
          key={i}
          className="bg-surface-variant/20 flex h-25 items-center justify-center rounded-2xl px-4 py-6 text-center text-lg"
        >
          <Skeleton className="w-full" />
        </li>
      ))}
    </ul>
  )
}
