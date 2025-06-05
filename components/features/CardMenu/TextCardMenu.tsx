import { CardMenuData } from '@/types/card-menu-items'

type TextCardMenuProps = {
  item: CardMenuData
}

export const TextCardMenu = ({ item }: TextCardMenuProps) => {
  return (
    <div className="relative z-10 flex-1">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-foreground line-clamp-2">
          {item.title}
        </h3>
      </div>

      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {item.description}
      </p>

      <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
        <span className="bg-muted px-2 py-1 rounded">{item.category}</span>
      </div>
    </div>
  )
}
