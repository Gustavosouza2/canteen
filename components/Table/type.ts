/* eslint-disable  @typescript-eslint/no-explicit-any */

import { IconType } from 'react-icons'

export interface TableColumn<T extends string> {
  name: T
  label?: string
  size?: string
}

export interface DataTableProps<T extends Array<any>> {
  title?: string
  isLoading?: boolean
  data: T
  footer?: {
    message: string
    icon?: IconType
    onClick?: () => void
  }
  columns: Readonly<TableColumn<any>[]>
}
