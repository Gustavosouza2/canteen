/* eslint-disable  @typescript-eslint/no-explicit-any */

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import * as Types from './type'
import { Skeleton } from '@/components/ui/skeleton'

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'success':
      return 'text-green-500'
    case 'processing':
      return 'text-yellow-500'
    case 'failed':
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}

export function DataTable<T extends Array<any>>({
  footer,
  columns,
  data,
  title,
  isLoading,
}: Types.DataTableProps<T>) {
  return (
    <div className="w-full">
      <h1 className="text-[#D1D1D2] mb-1">{title}:</h1>
      <div className="rounded-xl border border-[#DA4453] p-5 w-full">
        <Table className="w-full">
          {data && data?.length >= 1 && (
            <>
              <TableHeader>
                <TableRow className="border-b border-[#DA4453]/20 hover:bg-transparent">
                  {columns.map((column, index) => (
                    <TableHead
                      className={`w-${column.size} text-gray-400 font-medium place-items-center`}
                      key={`th-${index}`}
                    >
                      {column.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map(({ onClickRow, ...data }, dataIndex) => (
                  <TableRow
                    key={`tr-${dataIndex}`}
                    className="border-b border-[#DA4453]/20 hover:bg-[#DA4453]/5 transition-colors"
                  >
                    {isLoading ? (
                      <Skeleton className="w-[200px] rounded-xl " />
                    ) : (
                      columns.map((column, columnIndex) => (
                        <TableCell
                          className={`w-${column.size} ${
                            column.name === 'status'
                              ? getStatusColor(data[column.name])
                              : 'text-gray-200'
                          }`}
                          key={`tr-${columnIndex}`}
                          onClick={onClickRow}
                        >
                          {data[column.name] ? data[column.name] : '-'}
                        </TableCell>
                      ))
                    )}
                  </TableRow>
                ))}
              </TableBody>

              {!!footer && (
                <TableFooter>
                  <TableRow className="border-t border-[#DA4453]/20">
                    <TableCell colSpan={3} className="text-gray-400">
                      Total
                    </TableCell>
                    <TableCell className="text-right text-gray-200">
                      $2,500.00
                    </TableCell>
                  </TableRow>
                </TableFooter>
              )}
            </>
          )}
        </Table>
      </div>
    </div>
  )
}
