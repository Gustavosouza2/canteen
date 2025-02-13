import { ContextMenuItemsProps } from './context-menu-items'
import { IconType } from 'react-icons'

export interface TableColumn<T extends string> {
  label?: string
  size?: string
  name: T
}

export interface DataTableProps<T extends Array<any>> {
  items: ContextMenuItemsProps['items']
  onPageChange: (page: number) => void
  currentPage: number
  isLoading?: boolean
  totalPages: number
  title?: string
  data: T
  footer?: {
    onClick?: () => void
    icon?: IconType
    message: string
  }
  columns: Readonly<TableColumn<any>[]>
}
