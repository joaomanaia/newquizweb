import { DifficultySelectorItem } from "./difficulty-selector-item"

export const DifficultySelector: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      <DifficultySelectorItem difficulty="random" />
      <DifficultySelectorItem difficulty="easy" />
      <DifficultySelectorItem difficulty="medium" />
      <DifficultySelectorItem difficulty="hard" />
    </div>
  )
}
