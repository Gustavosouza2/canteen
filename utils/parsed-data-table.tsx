import { ContextMenuItems } from '@/components/features/ContextMenuItems'
import { ContextMenuItemsProps } from '@/types/context-menu-items'
import { TableColumn } from '@/types/table'

export const parsedDataTable = (
  BADGE_PROPS_COLOR: Record<string, JSX.Element>,
  items: ContextMenuItemsProps['items'],
  column: TableColumn<any>,
  data: any,
) => {
  if (column.name === 'amount')
    return Number(data[column.name]).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })

  if (column.name === 'actions') return <ContextMenuItems items={items} />

  if (column.name === 'status') return BADGE_PROPS_COLOR[data[column.name]]

  return data[column.name]
}
