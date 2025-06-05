import { MdRemove, MdAdd } from 'react-icons/md'

import { CardMenuData } from '@/types/card-menu-items'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type MainCardMenuProps = {
  tempPrice: string
  item: CardMenuData
  isEditingPrice: boolean
  handlePriceSubmit: () => void
  setTempPrice: (price: string) => void
  handleQuantityChange: (delta: number) => void
  setIsEditingPrice: (isEditing: boolean) => void
  handlePriceKeyDown: (e: React.KeyboardEvent) => void
}

export const MainCardMenu = ({
  item,
  tempPrice,
  setTempPrice,
  isEditingPrice,
  handlePriceSubmit,
  setIsEditingPrice,
  handlePriceKeyDown,
  handleQuantityChange,
}: MainCardMenuProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Preço:</span>
        {isEditingPrice ? (
          <Input
            type="number"
            value={tempPrice}
            onChange={(e) => setTempPrice(e.target.value)}
            onBlur={handlePriceSubmit}
            onKeyDown={handlePriceKeyDown}
            className="w-20 h-8 text-right"
            step="0.01"
            min="0"
            autoFocus
          />
        ) : (
          <button
            onClick={() => setIsEditingPrice(true)}
            className="text-lg font-bold hover:bg-muted px-2 py-1 rounded transition-colors"
          >
            R$ {item.price.toFixed(2)}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Estoque:</span>
        <div className="flex items-center gap-2 pb-5">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handleQuantityChange(-1)}
            disabled={item.quantity <= 0}
          >
            <MdRemove className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-semibold">
            {item.quantity}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handleQuantityChange(1)}
          >
            <MdAdd className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
