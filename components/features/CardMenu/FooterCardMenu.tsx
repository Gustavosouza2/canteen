import { CardMenuData } from '@/types/card-menu-items'
import { Switch } from '@/components/ui/switch'
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from '@/components/ui/tooltip'

type FooterCardMenuProps = {
  onToggleAvailability:
    | ((itemId: string, isAvailable: boolean) => void)
    | undefined
  item: CardMenuData
}

export const FooterCardMenu = ({
  item,
  onToggleAvailability,
}: FooterCardMenuProps) => {
  return (
    <div className="flex items-center justify-between pt-5 border-t">
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            item.isAvailable && item.quantity > 0
              ? 'bg-green-500'
              : 'bg-red-500'
          }`}
        />
        <span className="text-sm font-medium">
          {item.isAvailable ? 'Disponível' : 'Indisponível'}
        </span>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <Switch
              checked={item.isAvailable}
              onCheckedChange={(checked: boolean) =>
                onToggleAvailability?.(item.id, checked)
              }
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {item.isAvailable ? 'Tornar indisponível' : 'Tornar disponível'}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
