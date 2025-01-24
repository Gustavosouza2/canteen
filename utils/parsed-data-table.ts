import { TableColumn } from '@/types/table'

export const parsedDataTable = (
  data: any,
  column: TableColumn<any>,
  BADGE_PROPS_COLOR: Record<string, JSX.Element>,
) => {
  if (column.name === 'amount')
    return Number(data[column.name]).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })

  if (column.name === 'status') return BADGE_PROPS_COLOR[data[column.name]]

  return data[column.name]
}
