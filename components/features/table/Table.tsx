/* eslint-disable  @typescript-eslint/no-explicit-any */

import {
  TableHeader,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Table,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'

import { parsedDataTable } from '@/utils/parsed-data-table'
import { DataTableProps } from '@/types/table'
import { Pagination } from '../Pagination'

const BADGE_PROPS_COLOR: Record<string, JSX.Element> = {
  done: (
    <Badge className="bg-zinc-800 rounded-xl text-green-500 font-mono font-medium hover:bg-zinc-900">
      Pago
    </Badge>
  ),
  pending: (
    <Badge className="bg-zinc-800 text-orange-500  font-mono font-medium rounded-xl hover:bg-zinc-900">
      Pendente
    </Badge>
  ),
}

export function DataTable<T extends Array<any>>({
  data,
  items,
  columns,
  isLoading,
  totalPages,
  currentPage,
  onPageChange,
}: DataTableProps<T>) {
  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-96 rounded-xl" />
      ) : (
        <div className="w-full border border-[#FFFA]/10 rounded-xl">
          <div className="rounded-xl p-5 w-full">
            <Table className="w-full">
              {data && data?.length >= 1 && (
                <>
                  <TableHeader>
                    <TableRow className="border-b border-[#FFFA]/20 hover:bg-transparent">
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
                        className="border-b  border-[#FFFA]/10 hover:bg-[#FFFA]/5 transition-colors"
                      >
                        {columns.map((column, columnIndex) => (
                          <TableCell
                            className={`w-${column.size}`}
                            key={`tr-${columnIndex}`}
                            onClick={onClickRow}
                          >
                            {parsedDataTable(
                              BADGE_PROPS_COLOR,
                              items,
                              column,
                              data,
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </>
              )}
            </Table>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </>
  )
}
