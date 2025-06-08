import { MdRemove, MdAdd } from 'react-icons/md'

import { CardMenuData } from '@/types/card-menu-items'
import { Input } from '@/components/features/Input'
import { UseFormRegister } from 'react-hook-form'
import { Button } from '@/components/ui/button'

type MainCardMenuProps = {
  tempPrice: string
  item: CardMenuData
  isEditingPrice: boolean
  handlePriceSubmit: () => void
  register: UseFormRegister<any>
  setTempPrice: (price: string) => void
  handleQuantityChange: (delta: number) => void
  setIsEditingPrice: (isEditing: boolean) => void
  handlePriceKeyDown: (e: React.KeyboardEvent) => void
}

export const MainCardMenu = ({
  item,
  register,
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
            onChange={(e) => setTempPrice(e.target.value)}
            className="w-20 h-8 text-right"
            onKeyDown={handlePriceKeyDown}
            onBlur={handlePriceSubmit}
            register={register}
            placeholder="Preço"
            value={tempPrice}
            type="currency"
            name="price"
            step="0.01"
            autoFocus
            min="0"
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
