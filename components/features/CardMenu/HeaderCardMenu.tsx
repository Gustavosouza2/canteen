import { MdLocalOffer } from 'react-icons/md'

import { ContextMenuItemsProps } from '@/types/context-menu-items'
import { CardMenuData } from '@/types/card-menu-items'
import { Badge } from '@/components/ui/badge'

import { ContextMenuItems } from '../ContextMenuItems'

type HeaderCardMenuProps = {
  items: ContextMenuItemsProps['items']
  item: CardMenuData
}

const badgeStyleComponent: Record<CardMenuData['badgeType'], JSX.Element> = {
  isNew: (
    <Badge
      variant="secondary"
      className="bg-zinc-800 rounded-xl border border-green-500/30
   text-green-500 font-mono font-medium hover:bg-zinc-900"
    >
      Novo
    </Badge>
  ),
  hasPromotion: (
    <Badge
      variant="secondary"
      className="bg-zinc-800 rounded-xl border border-purple-500/30
     text-purple-500 font-mono font-medium hover:bg-zinc-900"
    >
      <MdLocalOffer className="w-3 h-3 mr-1" />
      Promoção
    </Badge>
  ),
}

export const HeaderCardMenu = ({ item, items }: HeaderCardMenuProps) => {
  return (
    <div className="relative z-10 flex justify-between items-start mb-3">
      <div className="flex flex-wrap gap-1">
        {badgeStyleComponent[item.badgeType]}
      </div>
      <ContextMenuItems items={items} />
    </div>
  )
}
